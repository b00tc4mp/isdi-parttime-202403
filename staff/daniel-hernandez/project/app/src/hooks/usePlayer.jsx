import Config from 'react-native-config';
import { useCallback } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { useAbortController } from '../store/controller';
import { useTrackStore } from '../store/track';
import { InvalidTokenError, SystemError, TokenExpiredError } from 'com/errors';
import { storage } from '../services';
import services from '../services';

const usePlayer = () => {
   const { createNewAbortController, abortCurrentAbortController } = useAbortController();

   const setCurrentTrackId = useTrackStore(state => state.setCurrentTrackId);

   const register = useCallback(() => {
      TrackPlayer.registerPlaybackService(() => services.playback);
   }, []);

   const setup = useCallback(async () => {
      try {
         await TrackPlayer.setupPlayer();
         TrackPlayer.updateOptions({ stopWithApp: true, capabilities: [Capability.Play, Capability.Pause, Capability.Stop, Capability.SkipToNext, Capability.SkipToPrevious, Capability.SeekTo], compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious], progressUpdateEventInterval: 1 });

         // Check if the user was last listening to a playlist
         const stringifiedPlaylist = storage.getString(Config.CURRENT_PLAYLIST_KEY);
         const playlistIndex = storage.getNumber(Config.CURRENT_PLAYLIST_INDEX_KEY);
         const playlistId = storage.getString(Config.CURRENT_PLAYLIST_ID_KEY)

         if (stringifiedPlaylist && playlistIndex !== null && playlistId) {
            let playlist, info;

            try {
               playlist = JSON.parse(stringifiedPlaylist);
            } catch { return; }

            const track = playlist[playlistIndex];

            if (track) {
               try {
                  info = await services.player(track.id);
               } catch (error) {
                  if (error instanceof TokenExpiredError || error instanceof InvalidTokenError) throw error;
                  return;
               }

               try {
                  await TrackPlayer.load({
                     id: track.id,
                     url: info.url,
                     contentType: info.mimeType,
                     duration: parseInt(info.duration),
                     title: track.name,
                     artist: track.artists.length > 2 ? `${track.artists.slice(0, 2).map(artist => artist.username).join(', ')}...` : track.artists.map(artist => artist.username).join(', '),
                     album: track.album.name,
                     artwork: track.coverArt || require('../../assets/images/extras/unknown.png'),
                     headers: { Authorization: `Bearer ${info.token}` }
                  });
               } catch { return; }

               useTrackStore.setState({
                  currentTrackId: track.id,
                  currentPlaylist: playlist,
                  currentTrackIndex: playlistIndex,
                  currentPlaylistId: playlistId
               });

               const progress = storage.getNumber(Config.TRACK_PROGRESS_KEY);

               if (progress) {
                  try {
                     await TrackPlayer.seekTo(progress);
                  } catch { return; }
               }
            }
         } else {
            const stringifiedTrack = storage.getString(Config.CURRENT_TRACK_KEY);
            const progress = storage.getNumber(Config.TRACK_PROGRESS_KEY);

            if (stringifiedTrack) {
               let track, info;

               try {
                  track = JSON.parse(stringifiedTrack);
               } catch { return; }

               try {
                  info = await services.player(track.id);
               } catch (error) {
                  if (error instanceof TokenExpiredError || error instanceof InvalidTokenError) throw error;
                  return;
               }

               // Set current track id
               setCurrentTrackId(track.id);

               try {
                  await TrackPlayer.load({
                     id: track.id,
                     url: info.url,
                     contentType: info.mimeType,
                     duration: parseInt(info.duration),
                     title: track.title,
                     artist: track.artist,
                     album: track.album,
                     artwork: track.artwork || require('../../assets/images/extras/unknown.png'),
                     headers: { Authorization: `Bearer ${info.token}` }
                  });
               } catch { return; }

               if (progress) {
                  try {
                     await TrackPlayer.seekTo(progress);
                  } catch { return; }
               }
            }
         }
      } catch (error) {
         if (error instanceof TokenExpiredError || error instanceof InvalidTokenError) throw error;
         throw new SystemError(`Failed to setup player: ${error.message}`);
      }
   }, [setCurrentTrackId]);

   const play = useCallback(async (item, range = null, requestId, playlist = null, index = 0, playlistId) => {
         try {
            const currentPlayRequest = useTrackStore.getState().playRequest;
            if (currentPlayRequest !== requestId) return;

            // Abort previous controller and reset to a new one
            abortCurrentAbortController();
            const newAbortController = createNewAbortController(); // Use the new controller immediately

            // If a playlist is provided, set it in the store
            if (playlist && playlistId) {
               useTrackStore.setState(state => ({ ...state, currentPlaylist: playlist, currentTrackIndex: index, currentPlaylistId: playlistId }));
            } else {
               // Clear playlist data if switching to a single track && remove it from storage
               useTrackStore.setState(state => ({ ...state, currentPlaylist: null, currentTrackIndex: null, currentPlaylistId: null }));
               storage.delete(Config.CURRENT_PLAYLIST_KEY);
               storage.delete(Config.CURRENT_PLAYLIST_INDEX_KEY);
               storage.delete(Config.CURRENT_PLAYLIST_ID_KEY);
            }

            const info = await services.player(item.id, { signal: newAbortController.signal });

            // Recheck the playRequest to make sure it's still valid
            if (useTrackStore.getState().playRequest !== requestId) return;

            // Check if the request was aborted before proceeding
            if (newAbortController.signal.aborted) throw new Error('AbortError');

            await TrackPlayer.load({
               id: item.id,
               url: info.url,
               contentType: info.mimeType,
               duration: parseInt(info.duration),
               title: item.name,
               artist: item.artists.length > 2 ? `${item.artists.slice(0, 2).map(artist => artist.username).join(', ')}...` : item.artists.map(artist => artist.username).join(', '),
               album: item.album.name,
               artwork: item.coverArt || require('../../assets/images/extras/unknown.png'),
               headers: { Authorization: `Bearer ${info.token}`, ...(range && { Range: range }) }
            });

            // Final check of the requestId to ensure its validity
            if (useTrackStore.getState().playRequest !== requestId) return;

            // Set the new currentTrack id
            // NOTE: Using a callback to ensure synchronous state update
            useTrackStore.setState(state => ({ ...state, currentTrackId: item.id }));

            await TrackPlayer.play();
         } catch (error) {
            if (error.message === 'AbortError') throw new Error('AbortError');
            throw new SystemError(`Player failed: ${error.message}`);
         }
      }, [abortCurrentAbortController, createNewAbortController]);

   const stop = useCallback(async () => {
      try {
         await TrackPlayer.stop();
      } catch (error) {
         throw new SystemError(`Failed to stop player: ${error.message}`);
      }
   }, []);

   const pause = useCallback(async () => {
      try {
         await TrackPlayer.pause();
      } catch (error) {
         throw new SystemError(`Failed to pause player: ${error.message}`);
      }
   }, []);

   const resume = useCallback(async () => {
      try {
         await TrackPlayer.play();
      } catch (error) {
         throw new SystemError(`Failed to play player: ${error.message}`);
      }
   }, []);

   const reset = useCallback(async () => {
      try {
         await TrackPlayer.reset();
      } catch (error) {
         throw new SystemError(`Failed to reset player: ${error.message}`);
      }
   }, []);

   const seekTo = useCallback(async position => {
      try {
         await TrackPlayer.seekTo(position);
      } catch (error) {
         throw new SystemError(`Failed to seek: ${error.message}`);
      }
   }, []);

   const restart = useCallback(async () => {
      try {
         await TrackPlayer.seekTo(0);
         await TrackPlayer.play();
      } catch (error) {
         throw new SystemError(`Failed to restart track: ${error.message}`);
      }
   }, []);

   const setLoopMode = useCallback(async (mode = 'Off') => {
      try {
         await TrackPlayer.setRepeatMode(mode);
      } catch (error) {
         throw new SystemError(`Failed to set loop mode to current track: ${error.message}`);
      }
   }, []);

   const getLoopMode = useCallback(async () => {
      let mode;
      try {
         mode = await TrackPlayer.getRepeatMode();
      } catch (error) {
         throw new SystemError(`Failed to get loop mode: ${error.message}`);
      }

      return mode;
   }, []);

   const skipToNext = useCallback(async () => {
      try {
         const { currentPlaylist, currentTrackIndex, currentPlaylistId, currentTrackId } = useTrackStore.getState();

         if (currentPlaylist && currentTrackIndex !== null && currentPlaylistId && currentTrackIndex < currentPlaylist.length - 1 && currentTrackId) {
            const currentIndex = currentPlaylist.findIndex(t => t.id === currentTrackId);
            if (currentIndex === -1) return;

            const nextIndex = currentIndex + 1;
            const requestId = Date.now();

            useTrackStore.setState(state => ({ ...state, currentTrackIndex: nextIndex, playRequest: requestId }));
            await play(currentPlaylist[nextIndex], null, requestId, currentPlaylist, nextIndex, currentPlaylistId);
         }
      } catch (error) {
         if (error.message === 'AbortError') throw new Error('AbortError');
         throw new SystemError(`Failed to skip to next track: ${error.message}`);
      }
   }, [play]);

   const skipToPrevious = useCallback(async () => {
      try {
         const { currentPlaylist, currentTrackIndex, currentPlaylistId, currentTrackId } = useTrackStore.getState();
         const { position } = await TrackPlayer.getProgress();

         if (position > 3) {
            await TrackPlayer.seekTo(0);
         } else if (currentPlaylist && currentTrackIndex !== null && currentPlaylistId && currentTrackIndex > 0 && currentTrackId) {
            const currentIndex = currentPlaylist.findIndex(t => t.id === currentTrackId);

            const prevIndex = currentIndex - 1;
            const requestId = Date.now();

            useTrackStore.setState(state => ({ ...state, playRequest: requestId }));
            await play(currentPlaylist[prevIndex], null, requestId, currentPlaylist, prevIndex, currentPlaylistId);
         } else {
            await TrackPlayer.skipToPrevious(0);
         }
      } catch (error) {
         if (error.message === 'AbortError') throw new Error('AbortError');
         throw new SystemError(`Failed to skip to previous track: ${error.message}`);
      }
   }, [play]);

   return {
      register,
      setup,
      play,
      stop,
      pause,
      resume,
      reset,
      seekTo,
      restart,
      setLoopMode,
      getLoopMode,
      skipToNext,
      skipToPrevious,
   };
};

export default usePlayer;

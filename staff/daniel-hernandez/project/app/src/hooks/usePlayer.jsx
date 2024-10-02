import Config from 'react-native-config';
import { useCallback } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { SystemError } from 'com/errors';
import { storage } from '../services';
import services from '../services';

const usePlayer = () => {
   const register = useCallback(() => {
      TrackPlayer.registerPlaybackService(() => services.playback);
   }, []);

   const setup = useCallback(async () => {
      try {
         await TrackPlayer.setupPlayer();
         TrackPlayer.updateOptions({
            stopWithApp: true,
            capabilities: [Capability.Play, Capability.Pause, Capability.Stop, Capability.SkipToNext, Capability.SkipToPrevious, Capability.SeekTo],
            compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
            progressUpdateEventInterval: 1
         });

         const stringifiedTrack = storage.getString(Config.CURRENT_TRACK_KEY);
         const progress = storage.getNumber(Config.TRACK_PROGRESS_KEY);
         if (stringifiedTrack) {
            let track, info;
            try {
               track = JSON.parse(stringifiedTrack);
            } catch (error) {
               console.error(`Failed to parse stringified track: ${error.message}`);
               return;
            }

            try {
               info = await services.player(track.id);
            } catch (error) {
               console.error(`Failed to get player info: ${error.message}`);
               return;
            }

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
            } catch (error) {
               console.error(`Failed to load track: ${error.message}`);
               return;
            }

            if (progress) {
               try {
                  await TrackPlayer.seekTo(progress);
               } catch (error) {
                  console.error(`Failed to seek to saved position: ${error.message}`);
                  return;
               }
            }
         }
      } catch (error) {
         throw new SystemError(`Failed to setup player: ${error.message}`);
      }
   }, []);

   const play = useCallback(async (item, range = null, { signal }) => {
      try {
         const [_, info] = await Promise.all([TrackPlayer.reset(), services.player(item.id, { signal })]);

         await TrackPlayer.load({
            id: item.id,
            url: info.url,
            contentType: info.mimeType,
            duration: parseInt(info.duration),
            title: item.name,
            artist:
               item.artists.length > 2
                  ? `${item.artists
                       .slice(0, 2)
                       .map(artist => artist.username)
                       .join(', ')}...`
                  : item.artists.map(artist => artist.username).join(', '),
            album: item.album.name,
            artwork: item.coverArt || require('../../assets/images/extras/unknown.png'),
            headers: { Authorization: `Bearer ${info.token}`, ...(range && { Range: range }) }
         });

         await TrackPlayer.play();
      } catch (error) {
         if (signal?.aborted) throw new Error('AbortError');
         throw new SystemError(`Player failed: ${error.message}`);
      }
   }, []);

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

   const getCurrentState = useCallback(async () => {
      try {
         const state = await TrackPlayer.getPlaybackState();
         const currentTrack = await TrackPlayer.getActiveTrack();
         const progress = await TrackPlayer.getProgress();

         return { state, currentTrack, progress };
      } catch (error) {
         throw new SystemError(`Failed to get track state: ${error.message}`);
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

   const skipToNext = useCallback(async () => {
      try {
         const queue = await TrackPlayer.getQueue();
         const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();

         if (currentTrackIndex < queue.length - 1) {
            await TrackPlayer.skipToNext(0);
         }
      } catch (error) {
         throw new SystemError(`Failed to skip to next track: ${error.message}`);
      }
   }, []);

   const skipToPrevious = useCallback(async () => {
      try {
         const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
         const { position } = await TrackPlayer.getProgress();

         if (position > 3) {
            await TrackPlayer.seekTo(0);
         } else if (currentTrackIndex > 0) {
            await TrackPlayer.skipToPrevious(0);
         }
      } catch (error) {
         throw new SystemError(`Failed to skip to previous track: ${error.message}`);
      }
   }, []);

   return {
      register,
      setup,
      play,
      stop,
      pause,
      resume,
      getCurrentState,
      reset,
      seekTo,
      restart,
      setLoopMode,
      skipToNext,
      skipToPrevious
   };
};

export default usePlayer;

import Config from 'react-native-config';
import TrackPlayer, { Event } from 'react-native-track-player';
import { storage } from './storage';
import { useTrackStore } from '../store/track';
import player from './player';

const dynamicPrefixes = [Config.RECENT_TRACKS_DYNAMIC_PREFIX, Config.MOST_PLAYED_DYNAMIC_PREFIX, Config.LIKED_TRACKS_DYNAMIC_PREFIX, Config.FOLLOWED_MIX_DYNAMIC_PREFIX, Config.DISCOVER_WEEKLY_DYNAMIC_PREFIX].join('|');
const dynamicPattern = new RegExp(`^(${dynamicPrefixes})`);

// This service needs to be registered for react-native-track-player to work
export const playback = () => {
   TrackPlayer.addEventListener(Event.RemotePause, () => {
      TrackPlayer.pause();
   });

   TrackPlayer.addEventListener(Event.RemotePlay, () => {
      TrackPlayer.play();
   });

   TrackPlayer.addEventListener(Event.RemoteNext, async () => {
      const { currentPlaylist, currentTrackIndex, currentPlaylistId, currentTrackId } = useTrackStore.getState();
      if (!currentPlaylist || currentTrackIndex === null || !currentPlaylistId || !currentTrackId) return;

      const currentIndex = currentPlaylist.findIndex(t => t.id === currentTrackId);
      if (currentIndex === -1) return;

      const nextIndex = currentIndex + 1;
      if (nextIndex >= currentPlaylist.length) return;
      const nextTrack = currentPlaylist[nextIndex];

      let info;
      try { info = await player(nextTrack.id); } catch {}

      try {
         await TrackPlayer.load({
            id: nextTrack.id,
            url: info.url,
            contentType: info.mimeType,
            duration: parseInt(info.duration),
            title: nextTrack.name,
            artist: nextTrack.artists.length > 2 ? `${nextTrack.artists.slice(0, 2).map(artist => artist.username).join(', ')}...` : nextTrack.artists.map(artist => artist.username).join(', '),
            album: nextTrack.album.name,
            artwork: nextTrack.coverArt || require('../../assets/images/extras/unknown.png'),
            headers: { Authorization: `Bearer ${info.token}` }
         });
      } catch {}

      useTrackStore.setState({ currentTrackId: nextTrack.id, currentTrackIndex: nextIndex });

      try { await TrackPlayer.play(); } catch {}
   });

   TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
      const { currentPlaylist, currentTrackIndex, currentPlaylistId, currentTrackId } = useTrackStore.getState();
      const { position } = await TrackPlayer.getProgress();

      if (position > 3) {
         await TrackPlayer.seekTo(0);
         return;
      }

      if (!currentPlaylist || currentTrackIndex === null || currentTrackIndex <= 0 || !currentPlaylistId || !currentTrackId) return;

      const currentIndex = currentPlaylist.findIndex(t => t.id === currentTrackId);

      const prevIndex = currentIndex - 1;
      const prevTrack = currentPlaylist[prevIndex];

      let info;
      try { info = await player(prevTrack.id); } catch {}

      try {
         await TrackPlayer.load({
            id: prevTrack.id,
            url: info.url,
            contentType: info.mimeType,
            duration: parseInt(info.duration),
            title: prevTrack.name,
            artist: prevTrack.artists.length > 2 ? `${prevTrack.artists.slice(0, 2).map(artist => artist.username).join(', ')}...` : prevTrack.artists.map(artist => artist.username).join(', '),
            album: prevTrack.album.name,
            artwork: prevTrack.coverArt || require('../../assets/images/extras/unknown.png'),
            headers: { Authorization: `Bearer ${info.token}` }
         });
      } catch {}

      useTrackStore.setState({ currentTrackId: prevTrack.id, currentTrackIndex: prevIndex });

      try { await TrackPlayer.play(); } catch {}
   });

   TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
      TrackPlayer.seekBy(event.interval);
   });

   TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
      TrackPlayer.seekBy(-event.interval);
   });

   TrackPlayer.addEventListener(Event.RemoteSeek, event => {
      TrackPlayer.seekTo(event.position);
   });

   // Playback queue and progress events
   TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async event => {
      storage.delete(Config.CURRENT_TRACK_KEY);
      storage.delete(Config.TRACK_PROGRESS_KEY);

      const { currentPlaylist, currentTrackIndex, currentPlaylistId } = useTrackStore.getState();

      if (currentPlaylistId?.match(new RegExp(dynamicPattern))) {
         // Clear dynamic playlist data
         storage.delete(Config.CURRENT_PLAYLIST_KEY);
         storage.delete(Config.CURRENT_PLAYLIST_INDEX_KEY);
         storage.delete(Config.CURRENT_PLAYLIST_ID_KEY);
      }

      if (currentPlaylist && currentTrackIndex !== null) {
         const nextIndex = currentTrackIndex + 1;

         if (nextIndex < currentPlaylist.length) {
            // Play the next track in the playlist
            const nextTrack = currentPlaylist[nextIndex];

            try {
               const info = await player(nextTrack.id);

               await TrackPlayer.load({
                  id: nextTrack.id,
                  url: info.url,
                  contentType: info.mimeType,
                  duration: parseInt(info.duration),
                  title: nextTrack.name,
                  artist: nextTrack.artists.length > 2 ? `${nextTrack.artists.slice(0, 2).map(artist => artist.username).join(', ')}...` : nextTrack.artists.map(artist => artist.username).join(', '),
                  album: nextTrack.album.name,
                  artwork: nextTrack.coverArt || require('../../assets/images/extras/unknown.png'),
                  headers: { Authorization: `Bearer ${info.token}` }
               });

               // Set new currentTrackId
               useTrackStore.setState({ currentTrackId: nextTrack.id });

               await TrackPlayer.play();
               useTrackStore.setState({ currentTrackIndex: nextIndex });
            } catch {
               // Failed to load next track
               // TODO: Find a way to notify the user that the auto play feature has failed
               try {
                  await TrackPlayer.stop();
               } catch {}
            }
         } else {
            // End of playlist stop / reset
            try {
               await TrackPlayer.stop();
            } catch {}
         }
      }
   });

   TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, event => {
      storage.delete(Config.CURRENT_TRACK_KEY);
      storage.delete(Config.TRACK_PROGRESS_KEY);

      if (event.track) {
         let track;

         try {
            track = JSON.stringify(event.track);
         } catch {}

         try {
            if (track) {
               storage.set(Config.CURRENT_TRACK_KEY, track);
            }
         } catch {}
      }

      const { currentPlaylist, currentTrackIndex, currentPlaylistId } = useTrackStore.getState();
      if (currentPlaylist && currentTrackIndex !== null && currentPlaylistId && !currentPlaylistId?.match(new RegExp(dynamicPattern))) {
         // Persist non-dynamic playlists
         let playlist;

         try {
            playlist = JSON.stringify(currentPlaylist);
         } catch {}

         try {
            if (playlist) {
               storage.set(Config.CURRENT_PLAYLIST_KEY, playlist);
               storage.set(Config.CURRENT_PLAYLIST_INDEX_KEY, currentTrackIndex);
               storage.set(Config.CURRENT_PLAYLIST_ID_KEY, currentPlaylistId);
            }
         } catch {}
      } else {
         // Clear dynamic playlists from storage
         storage.delete(Config.CURRENT_PLAYLIST_KEY);
         storage.delete(Config.CURRENT_PLAYLIST_INDEX_KEY);
         storage.delete(Config.CURRENT_PLAYLIST_ID_KEY);
      }
   });

   TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, event => {
      storage.set(Config.TRACK_PROGRESS_KEY, event.position);
   });
};

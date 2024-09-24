import Config from 'react-native-config';
import TrackPlayer, { Event } from 'react-native-track-player';
import { storage } from './storage';

// This service needs to be registered for react-native-track-player to work
export const playback = () => {
   TrackPlayer.addEventListener(Event.RemotePause, () => {
      TrackPlayer.pause();
   });

   TrackPlayer.addEventListener(Event.RemotePlay, () => {
      TrackPlayer.play();
   });

   TrackPlayer.addEventListener(Event.RemoteNext, () => {
      TrackPlayer.skipToNext();
   });

   TrackPlayer.addEventListener(Event.RemotePrevious, () => {
      TrackPlayer.skipToPrevious();
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

   TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async event => {
      storage.delete(Config.CURRENT_TRACK_KEY);
      storage.delete(Config.TRACK_PROGRESS_KEY);
   });

   TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, event => {
      storage.delete(Config.CURRENT_TRACK_KEY);
      storage.delete(Config.TRACK_PROGRESS_KEY);

      if (event.track) {
         let track;
         try {
            track = JSON.stringify(event.track);
         } catch (error) {
            console.error(`Failed to stringify current track: ${error.message}`);
         }

         try {
            if (track) {
               storage.set(Config.CURRENT_TRACK_KEY, track);
            }
         } catch (error) {
            console.error(`Failed to save current track: ${error.message}`);
         }
      }
   });

   TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, event => {
      storage.set(Config.TRACK_PROGRESS_KEY, event.position);
   });

   TrackPlayer.addEventListener(Event.PlaybackError, event => {
      console.error('PLAYBACK ERROR:', event);
   });
};

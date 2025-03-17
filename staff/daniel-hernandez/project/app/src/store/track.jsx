import { create } from 'zustand';

export const useTrackStore = create(set => ({
   currentTrackId: null,
   playRequest: null,
   currentPlaylist: null, // Array of tracks in the current playlist
   currentTrackIndex: null, // Index of the currently playing track in the playlist
   currentPlaylistId: null, // Current playlist id for ui stuff

   // Sets a new current track id
   setCurrentTrackId: id => set({ currentTrackId: id }),

   // Sets a new play request 'id'
   setPlayRequest: id => set({ playRequest: id }),

   // Sets the current playlist and track index
   setCurrentPlaylist: (playlist, index = 0) => set({ currentPlaylist: playlist, currentTrackIndex: index }),

   // Clears the current playlist
   clearPlaylist: () => set({ currentPlaylist: null, currentTrackIndex: null }),

   // Updates the current track index
   setCurrentTrackIndex: index => set({ currentTrackIndex: index })
}));

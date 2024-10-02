import { create } from 'zustand';

export const useAuthStore = create(set => ({
   isLoading: true,
   isSignout: false,
   userToken: null,

   // Sets restore token state
   setRestoreToken: token => set({ userToken: token, isLoading: false }),

   // Sets signin state
   setSignIn: token => set({ isSignout: false, userToken: token }),

   // Sets signout state
   setSignOut: () => set({ isSignout: true, userToken: null })
}));

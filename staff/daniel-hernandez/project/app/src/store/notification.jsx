import { create } from 'zustand';

export const useNotificationStore = create(set => ({
   message: '',
   type: 'default',
   isNotificationActive: false,
   notificationTimeoutRef: null,

   // Sets a new notification
   setNotification: (message, type) => set({ message, type, isNotificationActive: true }),

   // Resets the notification
   resetNotification: () => set({ message: '', type: 'default', isNotificationActive: false }),

   // Stores the timeout reference
   setNotificationTimeoutRef: ref => set({ notificationTimeoutRef: ref })
}));

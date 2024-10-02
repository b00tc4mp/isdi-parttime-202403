import { useNotificationStore } from '../store/notification';

export const notificationTypes = { info: 'info', success: 'success', warning: 'warning', error: 'error', default: 'default' };

const useNotification = (timeoutDuration = 3600) => {
   const { notificationTimeoutRef, isNotificationActive, setNotification, resetNotification, setNotificationTimeoutRef } = useNotificationStore();

   const notify = (message, type) => {
      if (!message || isNotificationActive || !Object.values(notificationTypes).includes(type)) return;

      if (notificationTimeoutRef) {
         clearTimeout(notificationTimeoutRef);
      }

      setNotification(message, type);
      setNotificationTimeoutRef(
         setTimeout(() => {
            resetNotification();
         }, timeoutDuration)
      );
   };

   return {
      notify,
      notificationTypes
   };
};

export default useNotification;

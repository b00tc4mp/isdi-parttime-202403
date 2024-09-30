import { useRef, useState } from 'react';

const notificationTypes = { info: 'info', success: 'success', warning: 'warning', error: 'error', default: 'default' };

const useNotification = (timeoutDuration = 3600) => {
   const [message, setMessage] = useState('');
   const [type, setType] = useState('default');

   const isNotificationActive = useRef(false);
   const notificationTimeoutRef = useRef(null);

   const notify = (m, t) => {
      if (!m || isNotificationActive.current || !Object.values(notificationTypes).includes(t)) return;

      if (notificationTimeoutRef.current) {
         clearTimeout(notificationTimeoutRef.current);
      }

      setType(t);
      setMessage(m);

      isNotificationActive.current = true;
      notificationTimeoutRef.current = setTimeout(() => {
         isNotificationActive.current = false;
         setMessage('');
      }, timeoutDuration);
   };

   return { notify, message, type, notificationTypes };
};

export default useNotification;

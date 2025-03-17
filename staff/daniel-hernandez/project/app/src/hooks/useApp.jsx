import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import usePlayer from './usePlayer';
import useNotification from './useNotification';
import { useAuthStore } from '../store/auth';
import { InvalidTokenError, TokenExpiredError } from 'com/errors';
import { storage } from '../services';
import validate from 'com/validation';

const useApp = () => {
   const { setup } = usePlayer();
   const { notify, notificationTypes } = useNotification();

   const setRestoreToken = useAuthStore(state => state.setRestoreToken);
   const setSignOut = useAuthStore(state => state.setSignOut);

   const initialize = async () => {
      let userToken;

      try {
         userToken = await SecureStore.getItemAsync(Config.USER_TOKEN_KEY);
      } catch {
         notify('Token restore failed', notificationTypes.error);
         return;
      }

      try {
         await setup();
      } catch (error) {
         if (error instanceof TokenExpiredError || error instanceof InvalidTokenError) {
            try {
               await SecureStore.deleteItemAsync(Config.USER_TOKEN_KEY);
               storage.clearAll();
            } catch {
               notify('Failed to clear token & sign out', notificationTypes.error);
               return;
            }
            notify('Session expired or token is corrupt', notificationTypes.warning);

            setSignOut();
            return;
         }
         notify('Player setup failed', notificationTypes.error);
         return;
      }

      if (userToken) {
         try {
            validate.token(userToken);
         } catch {
            try {
               await SecureStore.deleteItemAsync(Config.USER_TOKEN_KEY);
               storage.clearAll();
            } catch {
               notify('Failed to clear token', notificationTypes.error);
               return;
            }
            setSignOut();
            return;
         }

         // TODO: Fetch user preferences/settings & store them in mmkv storage
      }

      notify('Session restore successful', notificationTypes.info);
      setRestoreToken(userToken);
   };

   return { initialize };
};

export default useApp;

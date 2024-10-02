import Config from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import { useAuthStore } from '../store/auth';
import useNotification from './useNotification';
import services, { storage } from '../services';

const useAuth = () => {
   const { setSignIn, setSignOut } = useAuthStore();
   const { notify, notificationTypes } = useNotification();

   const signIn = async (email, password) => {
      let token;

      try {
         token = await services.signIn(email, password);
      } catch (e) {
         notify(e.message === 'Wrong password' ? 'Wrong password' : 'Something went wrong signing in', e.message === 'Wrong password' ? notificationTypes.warning : notificationTypes.error);
         return false;
      }

      try {
         await SecureStore.setItemAsync(Config.USER_TOKEN_KEY, token);
      } catch {
         notify('Something went wrong signing in', notificationTypes.error);
         return false;
      }

      setSignIn(token);
      return true;
   };

   const signOut = async () => {
      let token;

      try {
         token = await SecureStore.getItemAsync(Config.USER_TOKEN_KEY);
      } catch {
         notify('Oops. Something went wrong', notificationTypes.error);
         return;
      }

      if (token) {
         try {
            validate.token(token); // log validation ?
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

         try {
            await services.signOut(token);
         } catch (e) {
            // TODO: Improve error handling here.
            if (e.message !== "User doesn't exist") {
               notify('Oops. Something went wrong signing out', notificationTypes.error);
               return;
            }
         }
      }

      try {
         await SecureStore.deleteItemAsync(Config.USER_TOKEN_KEY);
         storage.clearAll();
      } catch {
         notify("Oops. Couldn't sign you out", notificationTypes.error);
         return;
      }

      setSignOut();
   };

   const signUp = async (email, password, username) => {
      let token;

      try {
         await services.signUp(email, password, username);
      } catch (e) {
         notify(e.message === 'User already exists' ? 'Username already exists' : 'Sign up failed; Try again later', e.message === 'User already exists' ? notificationTypes.warning : notificationTypes.error);
         return false;
      }

      try {
         token = await services.signIn(email, password);
      } catch {
         notify("Couldn't sign you in; Try again later", notificationTypes.error);
         return false;
      }

      try {
         await SecureStore.setItemAsync(Config.USER_TOKEN_KEY, token);
      } catch {
         notify('Sign up failed; Try again later', notificationTypes.error);
         return false;
      }

      setSignIn(token);
      return true;
   };

   const checkEmail = async email => {
      let bool;

      try {
         bool = await services.checkEmail(email);
      } catch {
         notify('Something went wrong. Try again later', notificationTypes.error);
         return null;
      }

      return bool;
   };

   return {
      signIn,
      signOut,
      signUp,
      checkEmail
   };
};

export default useAuth;

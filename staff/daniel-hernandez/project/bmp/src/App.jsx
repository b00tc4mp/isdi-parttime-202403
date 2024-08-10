import { useEffect, useReducer, useMemo, useState, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Text, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import AuthContext from './context/AuthContext';
import ToastNotification from './components/ToastNotification';

import LandingScreen from './screens/LandingScreen';
import EmailInputScreen from './screens/EmailInputScreen';
import PasswordInputScreen from './screens/PasswordInputScreen';
import UsernameInputScreen from './screens/UsernameInputScreen';

import HomeScreen from './screens/HomeScreen';

import services from './services';
import validate from 'com/validation';
import { InvalidArgumentError } from 'com/errors';

const Stack = createNativeStackNavigator();

// TODO: Componentize everything
// TODO: Fix loading state
const App = () => {
   const [message, setMessage] = useState('');
   const [type, setType] = useState('wrong');

   const notificationTimeoutRef = useRef(null);
   const isNotificationActive = useRef(false);

   // TODO: Make duration customizable ? (depending on errors)
   const notify = (m, t) => {
      if (isNotificationActive.current) return;
      setMessage('');

      const validTypes = ['info', 'success', 'warning', 'error', 'default'];
      if (!validTypes.includes(t)) throw new InvalidArgumentError('Invalid ToastNotification type');

      setType(t);
      setMessage(m);

      isNotificationActive.current = true;
      notificationTimeoutRef.current = setTimeout(() => {
         isNotificationActive.current = false;
      }, 3600);
   };

   const [state, dispatch] = useReducer(
      (prevState, action) => {
         switch (action.type) {
            case 'RESTORE_TOKEN':
               return {
                  ...prevState,
                  userToken: action.token,
                  isLoading: false
               };
            case 'SIGN_IN':
               return {
                  ...prevState,
                  isSignout: false,
                  userToken: action.token
               };
            case 'SIGN_OUT':
               return {
                  ...prevState,
                  isSignout: true,
                  userToken: null
               };
            default:
               return prevState;
         }
      },
      {
         isLoading: true,
         isSignout: false,
         userToken: null
      }
   );

   useEffect(() => {
      (async () => {
         let userToken;

         try {
            userToken = await SecureStore.getItemAsync('userToken');
         } catch {
            notify('Token restore failed', 'warning');
            return;
         }

         if (userToken) {
            try {
               validate.token(userToken);
            } catch {
               try {
                  await SecureStore.deleteItemAsync('userToken');
               } catch {
                  notify('Failed to clear token', 'error');
                  return;
               }
               dispatch({ type: 'SIGN_OUT' });
               return;
            }
         }

         notify('Token restore successful', 'info');
         dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      })();
   }, []);

   // TODO: Make context more managable with utility functions
   const authContext = useMemo(
      () => ({
         signIn: async data => {
            let token;

            try {
               token = await services.signIn(data.email, data.password);
            } catch (e) {
               if (e.message === 'Wrong password') {
                  notify('Wrong password', 'warning');
               } else {
                  notify('Something went wrong signing in', 'error');
               }

               return false;
            }

            try {
               await SecureStore.setItemAsync('userToken', token);
            } catch {
               notify('Something went wrong signing in', 'error');
               return false;
            }

            dispatch({ type: 'SIGN_IN', token });
            return true;
         },
         signOut: async () => {
            let token;

            try {
               token = await SecureStore.getItemAsync('userToken');
            } catch {
               notify('Oops. Something went wrong', 'error');
               return;
            }

            if (token) {
               try {
                  validate.token(token); // log validation ?
               } catch {
                  try {
                     await SecureStore.deleteItemAsync('userToken');
                  } catch {
                     notify('Failed to clear token', 'error');
                     return;
                  }
                  dispatch({ type: 'SIGN_OUT' });
                  return;
               }

               try {
                  await services.signOut(token);
               } catch (error) {
                  // TODO: Improve error handling here.
                  if (error.message !== "User doesn't exist") {
                     notify('Oops. Something went wrong signing out', 'error');
                     return;
                  }
               }
            }

            try {
               await SecureStore.deleteItemAsync('userToken');
            } catch {
               notify("Oops. Couldn't sign you out");
               return;
            }
            dispatch({ type: 'SIGN_OUT' });
         },
         signUp: async data => {
            let token;

            try {
               await services.signUp(data.email, data.password, data.username);
            } catch (e) {
               if (e.message === 'User already exists') {
                  notify('Username already exists', 'warning');
               } else {
                  notify('Sign up failed; Try again later', 'error');
               }

               return false;
            }

            try {
               token = await services.signIn(data.email, data.password);
            } catch {
               notify("Couldn't sign you in; Try again later", 'error');
               return false;
            }

            try {
               await SecureStore.setItemAsync('userToken', token);
            } catch {
               notify('Sign up failed; Try again later', 'error');
               return false;
            }

            dispatch({ type: 'SIGN_IN', token });
            return true;
         }
      }),
      []
   );

   // TODO: Make error handling more centralized ?
   // Maybe with a error boundary or error logging system ?

   return (
      <AuthContext.Provider value={authContext}>
         <ToastNotification message={message} type={type} />
         <Stack.Navigator
            screenOptions={({ navigation }) => ({
               headerStyle: { backgroundColor: '#1B1A1A' },
               headerShadowVisible: false,
               headerLeft: () => (
                  <Pressable className="bg-palette-80 w-[36] h-[36] justify-center rounded-xl ml-[0.75rem]" onPress={() => navigation.goBack()}>
                     <Text className="text-palette-30 text-center text-4xl font-monaspace">«</Text>
                  </Pressable>
               )
            })}
         >
            {state.userToken == null ? (
               // No token found, user isn't signed in
               <>
                  <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false, animationTypeForReplace: state.isSignout ? 'pop' : 'push' }} />
                  <Stack.Screen name="EmailInput" component={EmailInputScreen} options={{ title: '' }} />
                  <Stack.Screen name="PasswordInput" component={PasswordInputScreen} options={{ title: '' }} />
                  <Stack.Screen name="UsernameInput" component={UsernameInputScreen} options={{ title: '' }} />
               </>
            ) : (
               // User is signed in
               <>
                  <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
               </>
            )}
         </Stack.Navigator>
         <StatusBar barStyle="light-content" />
      </AuthContext.Provider>
   );
};

export default App;

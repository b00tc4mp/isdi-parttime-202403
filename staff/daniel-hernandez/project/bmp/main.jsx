import './gesture-handler';
import './global.css';

import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { verifyInstallation } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import App from './src/App';

/* 

   NOTE:
      remember to reset the cache
      » npx react-native start --reset-cache => <C-c> => expo run:ios
      » npm run reset-cache => <C-c> => npm run ios

   TODO:
      @react-native-async-storage/async-storage

   WARN:
      @react-navigation/drawer throws a warning because
      findHostInstance_DEPRECATED is deprecated in StrictMode.

      expo-blur throws a warning because
      findNodeHandle is deprecated in StrictMode.

*/

const Root = () => {
   useEffect(() => {
      verifyInstallation();
   }, []);

   return (
      <React.StrictMode>
         <NavigationContainer>
            <App />
         </NavigationContainer>
      </React.StrictMode>
   );
};

registerRootComponent(Root);

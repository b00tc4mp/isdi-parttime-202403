import './global.css';

import React, { useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { verifyInstallation } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import App from './src/App';

/* TODO:
   "dependencies": {
   "@react-native-async-storage/async-storage": "^1.23.1",
   }
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

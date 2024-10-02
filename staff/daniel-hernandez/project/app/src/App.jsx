import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import useApp from './hooks/useApp';
import StackNavigator from './navigation/StackNavigator';
import ToastNotification from './components/ToastNotification';

// TODO:
//       check react-native-track-player to see if there is support for the new architecture (already on proper react-native and react versions)
//       all packages are supported except react-native-track-player (to enable the new architecture react-native-track-player must support it)
//
//       when support is added for the new architecture and we enable it:
//          upgrade mmkv to the latest version @3.x.x
//          replace onLayout with useLayoutEffect to avoid visual jumping (already avoided but this would be a cleaner aproach)
//

const App = () => {
   const { initialize } = useApp();

   useEffect(() => {
      initialize();
   }, []);

   // TODO: Make error handling more centralized ?
   // Maybe with a error boundary or error logging system ?

   return (
      <>
         <ToastNotification />
         <StackNavigator />
         <StatusBar barStyle="light-content" backgroundColor="#1B1A1A" />
      </>
   );
};

export default App;

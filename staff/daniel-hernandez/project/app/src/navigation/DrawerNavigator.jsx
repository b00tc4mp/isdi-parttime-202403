import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { Button } from 'react-native';
import TabNavigator from './TabNavigator';
import useAuth from '../hooks/useAuth';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
   const { signOut } = useAuth();

   return (
      <Drawer.Navigator
         screenOptions={{ headerShown: false }}
         drawerContent={() => (
            <DrawerContentScrollView className="flex-1 bg-palette-80">
               <Button title="Sign out" onPress={signOut} color="#E36526" />
            </DrawerContentScrollView>
         )}
      >
         <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer.Navigator>
   );
};

export default DrawerNavigator;

import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
   <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{ drawerItemStyle: { display: 'none' } }} />
   </Drawer.Navigator>
);

export default DrawerNavigator;

import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Header from '../components/Header';
import { useRouteTitle } from '../context/RouteTitleContext';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
   const { title } = useRouteTitle();

   return (
      <Drawer.Navigator
         screenOptions={({ navigation }) => ({
            header: () => <Header title={title ? title : ''} navigation={navigation} />,
            headerStyle: { backgroundColor: '#1B1A1A' },
            headerTintColor: '#ECE3DC',
            headerShadowVisible: false
         })}
      >
         <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer.Navigator>
   );
};

export default DrawerNavigator;

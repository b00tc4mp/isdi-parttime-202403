import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { TabIcons } from '../../assets/images/icons';
import { HomeScreen, SearchScreen, LibraryScreen } from '../screens';
import Header from '../components/Header';
import ControlBar from '../components/ControlBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
   <>
      <ControlBar />
      <Tab.Navigator
         screenOptions={({ route, navigation }) => ({
            header: () => <Header title={route.name === 'HomeTab' ? 'こんにちは, User.' : route.name === 'SearchTab' ? 'Search.' : route.name === 'LibraryTab' ? 'Library.' : ''} navigation={navigation} />,
            headerStyle: { backgroundColor: '#1B1A1A' },
            headerTintColor: '#ECE3DC',
            headerShadowVisible: false,
            tabBarIcon: ({ focused, color, size }) => {
               let iconSource;
               if (route.name === 'HomeTab') {
                  iconSource = focused ? TabIcons.homeIconActive : TabIcons.homeIcon;
               } else if (route.name === 'SearchTab') {
                  iconSource = focused ? TabIcons.glassIconActive : TabIcons.glassIcon;
               } else if (route.name === 'LibraryTab') {
                  iconSource = focused ? TabIcons.folderIconActive : TabIcons.folderIcon;
               }

               return <Image source={iconSource} style={{ width: size - 3.8, height: size - 3.8, tintColor: color, marginTop: 5 }} />;
            },
            tabBarActiveTintColor: '#E36526',
            tabBarInactiveTintColor: '#A0908A',
            tabBarShowLabel: false,
            tabBarStyle: { position: 'absolute', borderTopWidth: 0, borderTopColor: 'transparent', backgroundColor: 'transparent', height: 80 },
            tabBarBackground: () => <BlurView tint="dark" intensity={95} className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-r-xl rounded-l-xl" />
         })}
      >
         <Tab.Screen name="HomeTab" component={HomeScreen} />
         <Tab.Screen name="SearchTab" component={SearchScreen} />
         <Tab.Screen name="LibraryTab" component={LibraryScreen} />
      </Tab.Navigator>
   </>
);

export default TabNavigator;

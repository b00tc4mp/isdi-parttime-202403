import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { TabIcons } from '../../assets/images/icons';
import { HomeScreen, SearchScreen, LibraryScreen } from '../screens';
import FloatingPlayer from '../components/FloatingPlayer';
import ScreenBundle from './ScreenBundle';

const Tab = createBottomTabNavigator();

const HomeStack = () => <ScreenBundle name="HomeScreen" component={HomeScreen} title="こんにちは, User." />;
const SearchStack = () => <ScreenBundle name="SearchScreen" component={SearchScreen} title="Search." />;
const LibraryStack = () => <ScreenBundle name="LibraryScreen" component={LibraryScreen} title="Library." />;

const TabNavigator = () => (
   <>
      <FloatingPlayer />
      <Tab.Navigator
         unmountOnBlur={true}
         initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
         screenOptions={({ route }) => ({
            lazy: false,
            headerShown: false,
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
            tabBarBackground: () => <BlurView tint="dark" intensity={95} className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden rounded-r-xl rounded-l-xl" />,
            contentStyle: { backgroundColor: '#1B1A1A' }
         })}
      >
         <Tab.Screen name="HomeTab" component={HomeStack} />
         <Tab.Screen name="SearchTab" component={SearchStack} />
         <Tab.Screen name="LibraryTab" component={LibraryStack} />
      </Tab.Navigator>
   </>
);

export default TabNavigator;

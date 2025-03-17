import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import BackButton from '../components/buttons/BackButton';
import { UserScreen, PlaylistScreen, AlbumScreen } from '../screens';

const Bundle = createNativeStackNavigator();

const ScreenBundle = ({ name, component, title, options, props }) => (
   <Bundle.Navigator
      screenOptions={{
         headerStyle: { backgroundColor: '#1B1A1A' },
         headerTintColor: '#ECE3DC',
         headerShadowVisible: false,
         contentStyle: { backgroundColor: '#1B1A1A' }
      }}
   >
      <Bundle.Screen name={name} component={component} options={{ ...options, header: () => <Header title={title} /> }} {...props} />

      <Bundle.Screen name="UserScreen" component={UserScreen} options={{ headerTitle: '', headerLeft: () => <BackButton /> }} />
      <Bundle.Screen name="PlaylistScreen" component={PlaylistScreen} options={{ headerTitle: '', headerLeft: () => <BackButton /> }} />
      <Bundle.Screen name="AlbumScreen" component={AlbumScreen} options={{ headerTitle: '', headerLeft: () => <BackButton /> }} />
   </Bundle.Navigator>
);

export default ScreenBundle;

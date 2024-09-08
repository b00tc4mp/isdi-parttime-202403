import { View, Image } from 'react-native';
import LandingButton from '../../components/buttons/LandingButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LandingScreen = ({ navigation }) => {
   const insets = useSafeAreaInsets();

   return (
      <View className="flex-1 bg-palette-90 items-center" style={{ paddingBottom: insets.bottom }}>
         <View className="flex-1 items-center top-48">
            <Image source={require('../../../assets/images/extras/landing.png')} resizeMode="contain" className="w-80" />
         </View>

         <View className="bottom-0 w-[100%]">
            <LandingButton text="Create an account" onPress={() => navigation.navigate('EmailInput')} bgColor="bg-palette-30" />
            <LandingButton text="Log in" onPress={() => navigation.navigate('EmailInput')} bgColor="bg-palette-20" marginTop="mt-4" />
         </View>
      </View>
   );
};

export default LandingScreen;

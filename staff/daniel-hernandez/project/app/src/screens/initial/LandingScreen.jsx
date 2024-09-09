import { View, Image } from 'react-native';
import LandingButton from '../../components/buttons/LandingButton';

const LandingScreen = ({ navigation }) => {
   return (
      <View className="flex-1 bg-palette-90 items-center">
         <View className="flex-1 items-center top-48">
            <Image source={require('../../../assets/images/extras/landing.png')} resizeMode="contain" className="w-80" />
         </View>

         <View className="bottom-9 w-[100%]">
            <LandingButton text="Create an account" onPress={() => navigation.navigate('EmailInput')} className="bg-palette-30" />
            <LandingButton text="Log in" onPress={() => navigation.navigate('EmailInput')} className="mt-4 bg-palette-20" />
         </View>
      </View>
   );
};

export default LandingScreen;

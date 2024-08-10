import { View, Image, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native';

const LandingScreen = ({ navigation }) => {
   return (
      <SafeAreaView className="flex-1 bg-palette-90 items-center">
         <View className="flex-1 items-center top-24">
            <Image source={require('../../assets/images/landing.png')} resizeMode="center" />
         </View>

         <View className="bottom-0 w-[100%]">
            <Pressable onPress={() => navigation.navigate('EmailInput')} className="bg-palette-30 p-3.5 rounded-full mx-[1.5rem]">
               <Text className="font-poppins-bold text-palette-40 text-center text-base">Create an account</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('EmailInput')} className="bg-palette-20 p-3.5 rounded-full mt-4 mx-[1.5rem]">
               <Text className="font-poppins-bold text-palette-40 text-center text-base">Log in</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
};

export default LandingScreen;

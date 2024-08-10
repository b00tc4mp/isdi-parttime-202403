import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import AuthContext from '../context/AuthContext';

const HomeScreen = () => {
   const { signOut } = useContext(AuthContext);

   // lol
   return (
      <View className="flex-1 items-center bg-palette-90">
         <View className="flex-1 justify-center">
            <Text className="font-poppins-semibold text-palette-40">BMP Home Screen</Text>
            <Button title="Sign out" onPress={() => signOut()} />
         </View>
      </View>
   );
};

export default HomeScreen;

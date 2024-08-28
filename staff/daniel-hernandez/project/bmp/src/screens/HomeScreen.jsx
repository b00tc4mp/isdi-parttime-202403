import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import AuthContext from '../context/AuthContext';

const HomeScreen = () => {
   const { signOut } = useContext(AuthContext);

   return (
      <View className="flex-1 items-center justify-center bg-palette-90">
         <Text className="text-palette-40 font-monaspace text-center">{'<!> [ WiP ] <!>'}</Text>
         <Button title="Sign out" onPress={() => signOut()} color="#E36526" />
      </View>
   );
};

export default HomeScreen;

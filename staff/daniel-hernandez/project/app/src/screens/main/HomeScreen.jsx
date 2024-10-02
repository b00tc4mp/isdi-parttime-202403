import { View, Text, Button } from 'react-native';
import useAuth from '../../hooks/useAuth';

const HomeScreen = () => {
   const { signOut } = useAuth();

   return (
      <View className="flex-1 items-center justify-center bg-palette-90">
         <Text className="text-palette-40 font-monaspace text-center">{'<!> [ WiP ] <!>'}</Text>
         <Button title="Sign out" onPress={() => signOut()} color="#E36526" />
      </View>
   );
};

export default HomeScreen;

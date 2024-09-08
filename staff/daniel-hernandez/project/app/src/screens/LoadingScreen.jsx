import { View, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
   return (
      <View className="flex-1 justify-center items-center bg-palette-90">
         <ActivityIndicator size="small" color="#E36526" />
      </View>
   );
};

export default LoadingScreen;

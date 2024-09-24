import { View } from 'react-native';
import SpinningLoader from '../components/loaders/SpinningLoader';

const LoadingScreen = () => {
   return (
      <View className="flex-1 justify-center items-center bg-palette-90">
         <SpinningLoader tintColor="#E36526" />
      </View>
   );
};

export default LoadingScreen;

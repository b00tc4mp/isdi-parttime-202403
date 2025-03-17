import { View } from 'react-native';
import { useProgress } from 'react-native-track-player';

const FloatingPlayerProgressbar = () => {
   const { duration, position } = useProgress(250);

   return (
      <View className="w-full px-6 my-0.5">
         <View className="w-full bg-palette-60 h-[2px] rounded-full overflow-hidden">
            <View style={{ width: `${duration > 0 ? (parseInt(position) / parseInt(duration)) * 100 : 0}%` }} className="bg-palette-30 h-full" />
         </View>
      </View>
   );
};

export default FloatingPlayerProgressbar;

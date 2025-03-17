import { View, Image, Text } from 'react-native';
import { useProgress } from 'react-native-track-player';
import formatSeconds from '../utils/formatSeconds';

export const TrackImage = ({ activeTrack }) => (
   <View className="items-center my-20">
      <Image source={activeTrack?.artwork ? { uri: activeTrack.artwork } : require('../../assets/images/extras/unknown.png')} className="w-96 h-96 rounded-xl" />
   </View>
);

export const TrackInfo = ({ activeTrack }) => (
   <View className="overflow-hidden flex-col px-5">
      <Text className="text-palette-40 font-spacemono-bold text-sm px-2 w-full leading-tight" numberOfLines={1} ellipsizeMode="tail">
         {activeTrack?.title ?? ':3'}
      </Text>
      <Text className="text-palette-40 font-spacemono text-sm px-2 w-full leading-tight" numberOfLines={1} ellipsizeMode="tail">
         {activeTrack?.artist ?? '...'}
      </Text>
   </View>
);

export const TrackProgressStats = () => {
   const { position, duration } = useProgress(50);

   return (
      <View className="px-7">
         <Text className="text-palette-40 font-spacemono text-xs w-full leading-tight text-start" numberOfLines={1} ellipsizeMode="tail">
            {`${formatSeconds(parseInt(position))}`}
            <Text className="font-spacemono-bold">{` / `}</Text>
            {`${formatSeconds(parseInt(duration))}`}
         </Text>
      </View>
   );
};

export const EmptyTrackProgressStats = () => (
   <Text className="text-palette-40 font-spacemono text-xs w-full leading-tight text-start" numberOfLines={1} ellipsizeMode="tail">
      <Text className="font-spacemono-bold">[</Text>
      stats
      <Text className="font-spacemono-bold">]</Text>
   </Text>
);

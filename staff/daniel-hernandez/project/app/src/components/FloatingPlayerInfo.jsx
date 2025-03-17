import { View, Text } from 'react-native';
import { useProgress } from 'react-native-track-player';
import formatSeconds from '../utils/formatSeconds';

export const TrackInfo = ({ activeTrack }) => (
   <View className="flex-1 overflow-hidden flex-col">
      <Text className="text-palette-40 font-spacemono-bold text-xs px-2 w-full leading-tight" numberOfLines={1} ellipsizeMode="tail">
         {activeTrack?.title ?? ':3'}
      </Text>
      <Text className="text-palette-40 font-spacemono text-xs px-2 w-full leading-tight" numberOfLines={1} ellipsizeMode="tail">
         {activeTrack?.artist ?? '...'}
      </Text>
   </View>
);

export const TrackProgressStats = () => {
   const { position, duration } = useProgress(500);

   return (
      <>
         <Text className="text-palette-60 font-spacemono text-xs w-full leading-tight text-start" numberOfLines={1} ellipsizeMode="tail">
            <Text className="font-spacemono-bold">[</Text>
            {`${formatSeconds(parseInt(position))}`}
            <Text className="font-spacemono-bold">{` / `}</Text>
            {`${formatSeconds(parseInt(duration))}`}
            <Text className="font-spacemono-bold">]</Text>
         </Text>

         <Text className="text-palette-60 font-spacemono text-xs w-full leading-tight text-center" numberOfLines={1} ellipsizeMode="tail">
            <Text className="font-spacemono-bold">pct: [</Text>
            {`${parseInt(duration > 0 ? (parseInt(position) / parseInt(duration)) * 100 : 0)}%`}
            <Text className="font-spacemono-bold">]</Text>
         </Text>
      </>
   );
};

export const EmptyTrackProgressStats = () => (
   <Text className="text-palette-60 font-spacemono text-xs w-full leading-tight text-start" numberOfLines={1} ellipsizeMode="tail">
      <Text className="font-spacemono-bold">[</Text>
      stats
      <Text className="font-spacemono-bold">]</Text>
   </Text>
);

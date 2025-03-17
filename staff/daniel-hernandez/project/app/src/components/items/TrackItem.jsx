import { View, Image, Text, Pressable } from 'react-native';
import { useTrackStore } from '../../store/track';
import usePlayerHandlers from '../../hooks/usePlayerHandlers';
import SpinningLoader from '../loaders/SpinningLoader';
import { ItemIcons } from '../../../assets/images/icons';
import formatSeconds from '../../utils/formatSeconds';

const TrackItem = ({ item, onMore }) => {
   const currentTrackId = useTrackStore(state => state.currentTrackId);
   const { handlePlay } = usePlayerHandlers();

   return (
      <Pressable key={item?.id} className="py-2 flex-row items-start w-[100%] px-5 active:bg-palette-80 bg-palette-90" onPress={() => handlePlay(item)}>
         <View className="w-16 h-16 rounded-sm mr-3 justify-center">
            {currentTrackId === item?.id && <SpinningLoader className="absolute" tintColor="#E36526" />}

            <Image source={item?.coverArt ? { uri: item?.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />
            {currentTrackId === item?.id && <View className="absolute top-0 left-0 w-full h-full bg-palette-100 opacity-50 rounded-sm" />}
         </View>

         <View className="flex-1 justify-start mx-auto">
            <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
               {item?.name}
            </Text>

            <Text className="text-palette-40 font-spacemono text-sm leading-tight" numberOfLines={1} ellipsizeMode="tail">
               {item?.artists?.length > 2 ? `${item?.artists.slice(0, 2).map(artist => artist?.username).join(', ')}...` : item?.artists.map(artist => artist?.username).join(', ')}
            </Text>

            <Text className="text-palette-40 font-spacemono text-xs leading-snug" numberOfLines={1} ellipsizeMode="tail">{`${formatSeconds(item?.duration)}`}</Text>
         </View>

         <Pressable
            className="self-center h-5 w-5 ml-2"
            onPress={event => {
               event.stopPropagation();
               onMore(item);
            }}
         >
            <Image source={ItemIcons.moreIcon} className="self-center h-1 w-5 my-auto" resizeMode="contain" />
         </Pressable>
      </Pressable>
   );
};

export default TrackItem;

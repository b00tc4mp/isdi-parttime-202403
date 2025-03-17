import { View, Text, Pressable, Image } from 'react-native';
import { useTrackStore } from '../../store/track';
import usePlayerHandlers from '../../hooks/usePlayerHandlers';
import SpinningLoader from '../loaders/SpinningLoader';
import formatSeconds from '../../utils/formatSeconds';

const HomeTrackItem = ({ item, playlist, index, playlistId }) => {
   const currentTrackId = useTrackStore(state => state.currentTrackId);
   const { handlePlay } = usePlayerHandlers();

   return (
      <Pressable onPress={() => handlePlay(null, playlist, index, playlistId)} className="bg-palette-80 active:opacity-70 rounded-lg p-1 mx-2 my-1.5 items-center w-36 h-44">
         <View className="w-32 h-32 mt-1 rounded-lg justify-center">
            {currentTrackId === item.id && <SpinningLoader className="absolute" tintColor="#E36526" />}

            <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-32 h-32 rounded-md" />
            {currentTrackId === item.id && <View className="absolute top-0 left-0 w-full h-full bg-palette-100 opacity-50 rounded-sm" />}
         </View>

         <View className="w-full px-1 pt-1">
            <Text className="text-palette-40 font-spacemono-bold text-[9px] text-start leading-tight" numberOfLines={1} ellipsizeMode="tail">
               {item.name}
            </Text>

            <View className="flex-row justify-between">
               <Text className="text-palette-40 font-spacemono text-[8.5px] leading-tight flex-1" numberOfLines={1} ellipsizeMode="tail">
                  {item?.artists?.length > 2
                     ? `${item?.artists
                          .slice(0, 2)
                          .map(artist => artist?.username)
                          .join(', ')}...`
                     : item?.artists.map(artist => artist?.username).join(', ')}
               </Text>

               <Text className="text-palette-40 font-spacemono text-[8.5px] leading-tight ml-1" numberOfLines={1}>{`${formatSeconds(parseInt(item.duration))}`}</Text>
            </View>
         </View>
      </Pressable>
   );
};

export default HomeTrackItem;

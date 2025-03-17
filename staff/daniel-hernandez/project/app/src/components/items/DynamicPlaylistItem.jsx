import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTrackStore } from '../../store/track';
import SpinningLoader from '../loaders/SpinningLoader';
import formatSeconds from '../../utils/formatSeconds';

const DynamicPlaylistItem = ({ item }) => {
   const navigation = useNavigation();
   const currentPlaylistId = useTrackStore(state => state.currentPlaylistId);

   return (
      <Pressable className="bg-palette-80 active:opacity-70 rounded-lg p-1 mx-2 my-1.5 items-center w-36 h-44" onPress={() => navigation?.navigate('PlaylistScreen', { playlistId: item.id, isDynamic: true, dynamicPlaylist: item })}>
         <View className="w-32 h-32 mt-1 rounded-lg justify-center">
            {currentPlaylistId === item.id && <SpinningLoader className="absolute" tintColor="#E36526" />}

            <Image source={require('../../../assets/images/extras/unknown.png')} className="w-32 h-32 rounded-md" />
            {currentPlaylistId === item.id && <View className="absolute top-0 left-0 w-full h-full bg-palette-100 opacity-50 rounded-sm" />}
         </View>

         <View className="w-full px-1 pt-1">
            <View className="flex-row justify-between">
               <Text className="text-palette-40 font-spacemono-bold text-[9px] text-start leading-tight flex-1" numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
               </Text>

               <Text className="text-palette-40 font-spacemono text-[8px] leading-tight ml-1" numberOfLines={1} ellipsizeMode="tail">
                  {item.tracks.length} {item.tracks.length === 1 ? 'track' : 'tracks'}
               </Text>
            </View>

            <View className="flex-row justify-between">
               <Text className="text-palette-40 font-spacemono text-[8.5px] leading-tight flex-1" numberOfLines={1} ellipsizeMode="tail">
                  curated list
               </Text>
               <Text className="text-palette-40 font-spacemono text-[8px] leading-tight ml-1" numberOfLines={1} ellipsizeMode="tail">
                  {`${formatSeconds(item.tracks.reduce((sum, track) => sum + Number(track.duration), 0))}`}
               </Text>
            </View>
         </View>
      </Pressable>
   );
};

export default DynamicPlaylistItem;

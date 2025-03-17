import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTrackStore } from '../../store/track';
import SpinningLoader from '../loaders/SpinningLoader';
import { ItemIcons } from '../../../assets/images/icons';
import formatSeconds from '../../utils/formatSeconds';

const PlaylistItem = ({ item, onMore }) => {
   const navigation = useNavigation();
   const currentPlaylistId = useTrackStore(state => state.currentPlaylistId);

   return (
      <Pressable key={item.id} className="py-2 flex-row items-start w-[100%] px-5 active:bg-palette-80 bg-palette-90" onPress={() => navigation?.navigate('PlaylistScreen', { playlistId: item.id })}>
         <View className="w-16 h-16 rounded-sm mr-3 justify-center">
            {currentPlaylistId === item?.id && <SpinningLoader className="absolute" tintColor="#E36526" />}

            <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />
            {currentPlaylistId === item?.id && <View className="absolute top-0 left-0 w-full h-full bg-palette-100 opacity-50 rounded-sm" />}
         </View>

         <View className="flex-1 justify-start mx-auto">
            <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
               {item.name}
            </Text>
            <Text className="text-palette-40 font-spacemono text-sm leading-tight" numberOfLines={1} ellipsizeMode="tail">{`by ${item.owner.username}`}</Text>
            <Text className="text-palette-40 font-spacemono text-xs leading-snug">{`${item.tracks} ${parseInt(item.tracks) === 0 || parseInt(item.tracks) > 1 ? 'tracks' : 'track'} ~ ${formatSeconds(item.duration)}`}</Text>
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

export default PlaylistItem;

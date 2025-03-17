import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTrackStore } from '../../store/track';
import SpinningLoader from '../loaders/SpinningLoader';
import { ItemIcons } from '../../../assets/images/icons';

const AlbumItem = ({ item, onMore }) => {
   const navigation = useNavigation();
   const currentPlaylistId = useTrackStore(state => state.currentPlaylistId);

   return (
      <Pressable key={item.id} className="py-2 flex-row items-start w-[100%] px-5 active:bg-palette-80 bg-palette-90" onPress={() => navigation?.navigate('AlbumScreen', { albumId: item.id })}>
         <View className="w-16 h-16 rounded-sm mr-3 justify-center">
            {currentPlaylistId === item?.id && <SpinningLoader className="absolute" tintColor="#E36526" />}

            <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />
            {currentPlaylistId === item?.id && <View className="absolute top-0 left-0 w-full h-full bg-palette-100 opacity-50 rounded-sm" />}
         </View>

         <View className="flex-1 justify-start mx-auto">
            <Text className="text-palette-40 font-spacemono-bold text-sm leading-tight" numberOfLines={1} ellipsizeMode="tail">
               {item.name}
            </Text>

            <Text className="text-palette-40 font-spacemono text-xs leading-snug" numberOfLines={1} ellipsizeMode="tail">
               by {item.artists[0].username}
            </Text>
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

export default AlbumItem;

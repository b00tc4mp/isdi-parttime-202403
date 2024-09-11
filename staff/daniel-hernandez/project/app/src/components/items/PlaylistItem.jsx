import { View, Image, Text, Pressable } from 'react-native';
import formatSeconds from '../../utils/formatSeconds';

const PlaylistItem = ({ item }) => (
   <View key={item.id} className="mt-4 flex-row items-start w-[100%]">
      <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />

      <View className="flex-1 justify-start mx-auto">
         <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
            {item.name}
         </Text>
         <Text className="text-palette-40 font-spacemono text-sm leading-tight" numberOfLines={1} ellipsizeMode="tail">{`by ${item.owner.username}`}</Text>
         <Text className="text-palette-40 font-spacemono text-xs leading-snug">{`${item.tracks} ${parseInt(item.tracks) === 0 || parseInt(item.tracks) > 1 ? 'tracks' : 'track'} ~ ${formatSeconds(item.duration)}`}</Text>
      </View>

      <Pressable className="self-center h-5 w-5 ml-2">
         <Image source={require('../../../assets/images/extras/more.png')} className="self-center h-1 w-5 my-auto" resizeMode="contain" />
      </Pressable>
   </View>
);

export default PlaylistItem;

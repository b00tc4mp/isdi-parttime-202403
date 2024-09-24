import { View, Image, Text, Pressable } from 'react-native';
import BouncingDotsLoader from '../loaders/BouncingDotsLoader';
import { ItemIcons } from '../../../assets/images/icons';
import formatSeconds from '../../utils/formatSeconds';

const TrackItem = ({ item, onMore, onGeneralPress, isPlaying }) => {
   const artistsDisplay =
      item.artists.length > 2
         ? `${item.artists
              .slice(0, 2)
              .map(artist => artist.username)
              .join(', ')}...`
         : item.artists.map(artist => artist.username).join(', ');

   return (
      <Pressable key={item.id} className="py-2 flex-row items-start w-[100%] px-5 active:bg-palette-80 bg-palette-90" onPress={() => onGeneralPress(item)}>
         <View className="w-16 h-16 rounded-sm mr-3 justify-center">
            {isPlaying && <BouncingDotsLoader className="absolute" />}

            <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />
            {isPlaying && <View className="absolute top-0 left-0 w-full h-full bg-palette-100 opacity-50 rounded-sm" />}
         </View>

         <View className="flex-1 justify-start mx-auto">
            <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
               {item.name}
            </Text>

            <Text className="text-palette-40 font-spacemono text-sm leading-tight" numberOfLines={1} ellipsizeMode="tail">
               {artistsDisplay}
            </Text>
            <Text className="text-palette-40 font-spacemono text-xs leading-snug" numberOfLines={1} ellipsizeMode="tail">{`${formatSeconds(item.duration)}`}</Text>
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

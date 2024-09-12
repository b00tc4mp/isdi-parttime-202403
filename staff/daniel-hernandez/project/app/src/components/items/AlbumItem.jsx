import { View, Image, Text, Pressable } from 'react-native';

const AlbumItem = ({ item, onMore, onGeneralPress }) => (
   <Pressable key={item.id} className="mt-3 flex-row items-start w-[100%]" onPress={() => onGeneralPress(item)}>
      <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />

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
         <Image source={require('../../../assets/images/extras/more.png')} className="self-center h-1 w-5 my-auto" resizeMode="contain" />
      </Pressable>
   </Pressable>
);

export default AlbumItem;

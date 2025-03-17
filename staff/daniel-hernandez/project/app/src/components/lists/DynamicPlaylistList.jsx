import { View, Text, FlatList } from 'react-native';
import { DynamicPlaylistItem } from '../items';

const DynamicPlaylistList = ({ items }) => {
   const renderEmptyList = () => (
      <View className="w-[90%] bg-palette-80 items-center p-4 pt-3 mt-1.5 rounded-lg self-center">
         <Text className="font-poppins-semibold text-palette-40 text-base">...</Text>
         <Text className="font-poppins text-palette-40 text-sm">It appears theres no playlists.. check later?</Text>
      </View>
   );

   return (
      <View className="bg-palette-90 w-full mt-1.5">
         <Text className="text-palette-40 font-spacemono-bold text-base mx-5 mt-1.5">« Curated Playlists »</Text>
         {items.length === 0 ? (
            renderEmptyList()
         ) : (
            <FlatList data={items} renderItem={({ item }) => <DynamicPlaylistItem item={item} />} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }} initialNumToRender={5} maxToRenderPerBatch={5} />
         )}
      </View>
   );
};

export default DynamicPlaylistList;

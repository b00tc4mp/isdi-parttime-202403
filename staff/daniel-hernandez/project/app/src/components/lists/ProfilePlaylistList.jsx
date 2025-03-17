import { View, Text, FlatList } from 'react-native';
import { ProfilePlaylistItem } from '../items';

const ProfilePlaylistList = ({ items }) => {
   const renderEmptyList = () => (
      <View className="w-[90%] bg-palette-80 items-center p-4 pt-3 mt-1.5 rounded-lg self-center">
         <Text className="font-poppins-semibold text-palette-40 text-base">Gasp!</Text>
         <Text className="font-poppins text-palette-40 text-sm">This user doesn't have any public playlists yet.</Text>
      </View>
   );

   return (
      <View className="bg-palette-90 w-full mt-1.5">
         <Text className="text-palette-40 font-spacemono-bold text-base mx-5 mt-1.5">« Playlists »</Text>
         {items.length === 0 ? (
            renderEmptyList()
         ) : (
            <FlatList data={items} renderItem={({ item }) => <ProfilePlaylistItem item={item} />} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }} initialNumToRender={5} maxToRenderPerBatch={5} />
         )}
      </View>
   );
};

export default ProfilePlaylistList;

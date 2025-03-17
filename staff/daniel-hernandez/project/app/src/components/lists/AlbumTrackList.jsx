import { View, Text, FlatList } from 'react-native';
import { PlaylistTrackItem } from '../items';

const AlbumTrackList = ({ items, playlistId, ...props }) => {
   const renderEmptyList = () => (
      <View className="w-[90%] bg-palette-80 items-center p-4 pt-3 mt-1.5 rounded-lg self-center">
         <Text className="font-poppins-semibold text-palette-40 text-base">Uhh..</Text>
         <Text className="font-poppins text-palette-40 text-sm">You shouldn't be able to see this....</Text>
      </View>
   );

   return <FlatList data={items} keyExtractor={item => item.id} renderItem={({ item, index }) => <PlaylistTrackItem item={item} onMore={() => {}} playlist={items} index={index} playlistId={playlistId} />} showsVerticalScrollIndicator={false} ListEmptyComponent={renderEmptyList} {...props} />;
};

export default AlbumTrackList;

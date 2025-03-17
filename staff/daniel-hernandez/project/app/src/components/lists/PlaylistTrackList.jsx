import { View, Text, FlatList } from 'react-native';
import { PlaylistTrackItem } from '../items';

const PlaylistTrackList = ({ items, playlistId, isDynamic, ...props }) => {
   const renderEmptyList = () => (
      <View className="w-[90%] bg-palette-80 items-center p-4 pt-3 mt-1.5 rounded-lg self-center">
         <Text className="font-poppins-semibold text-palette-40 text-base">{isDynamic ? 'Welp..' : 'Dang!'}</Text>
         <Text className="font-poppins text-palette-40 text-sm">{isDynamic ? 'This dynamic playlist has no tracks' : 'No tracks in this playlist.'}</Text>
      </View>
   );

   return <FlatList data={items} keyExtractor={item => item.id} renderItem={({ item, index }) => <PlaylistTrackItem item={item} onMore={() => {}} playlist={items} index={index} playlistId={playlistId} />} showsVerticalScrollIndicator={false} ListEmptyComponent={renderEmptyList} {...props} />;
};

export default PlaylistTrackList;

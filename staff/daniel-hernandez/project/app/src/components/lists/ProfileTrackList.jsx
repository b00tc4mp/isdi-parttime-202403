import { View, Text, FlatList } from 'react-native';
import { ProfileTrackItem } from '../items';

const ProfileTrackList = ({ items }) => {
   const renderEmptyList = type => (
      <View className="w-[90%] bg-palette-80 items-center p-4 pt-3 mt-1.5 rounded-lg self-center">
         <Text className="font-poppins-semibold text-palette-40 text-base">Huh..</Text>
         <Text className="font-poppins text-palette-40 text-sm"> {type === 'popular' ? "This user doesn't have any popular tracks yet." : "This user hasn't added any recent tracks."}</Text>
      </View>
   );

   return (
      <View className="bg-palette-90 w-full mt-1.5">
         <Text className="text-palette-40 font-spacemono-bold text-base mx-5 mt-1.5">« Popular Tracks »</Text>
         {items.popular.length === 0 ? (
            renderEmptyList('popular')
         ) : (
            <FlatList data={items.popular} renderItem={({ item }) => <ProfileTrackItem item={item} />} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }} initialNumToRender={5} maxToRenderPerBatch={5} />
         )}

         <Text className="text-palette-40 font-spacemono-bold text-base mx-5 mt-1">« Recent Tracks »</Text>
         {items.recent.length === 0 ? (
            renderEmptyList('recent')
         ) : (
            <FlatList data={items.recent} renderItem={({ item }) => <ProfileTrackItem item={item} />} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }} initialNumToRender={5} maxToRenderPerBatch={5} />
         )}
      </View>
   );
};

export default ProfileTrackList;

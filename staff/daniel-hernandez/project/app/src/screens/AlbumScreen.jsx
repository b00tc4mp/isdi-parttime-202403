import { useCallback, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import SpinningLoader from '../components/loaders/SpinningLoader';
import AlbumHeader from '../components/AlbumHeader';
import AlbumTrackList from '../components/lists/AlbumTrackList';
import RetryButton from '../components/buttons/RetryButton';
import useNotification from '../hooks/useNotification';
import { useTrackStore } from '../store/track';
import services from '../services';

const AlbumScreen = ({ route }) => {
   const { albumId } = route.params;
   const { notify, notificationTypes } = useNotification();
   const currentTrackId = useTrackStore(state => state.currentTrackId);

   const [loading, setLoading] = useState(true);
   const [albumInfo, setAlbumInfo] = useState(null);

   useEffect(() => {
      getAlbumInfo();
   }, [albumId]);

   const getAlbumInfo = useCallback(async () => {
      try {
         setLoading(true);

         const info = await services.getAlbumInfo(albumId);
         setAlbumInfo(info);
      } catch {
         notify('Yikers, failed to get album', notificationTypes.error);
         setAlbumInfo(null);
      } finally {
         setLoading(false);
      }
   }, [albumId, notify]);

   // TODO: create skeleton loader/placeholder ui of this screen
   return (
      <View className="flex-1 bg-palette-90">
         {!loading && albumInfo && <AlbumTrackList className="top-0" items={albumInfo.tracks} playlistId={albumId} contentContainerStyle={{ paddingBottom: currentTrackId ? 150 : 85 }} ListHeaderComponent={<AlbumHeader item={albumInfo} />} />}

         {loading && !albumInfo && (
            <View className="flex-1 justify-center items-center">
               <SpinningLoader tintColor="#E36526" />
            </View>
         )}

         {!albumInfo && !loading && (
            <View className="flex-1 items-center justify-center">
               <Text className="font-monaspace text-palette-40 text-[15px] mb-1.5">Woops, Something went wrong.</Text>
               <Text className="font-monaspace text-palette-40 text-[11px] leading-normal">Oh, I know what the ladies like. ~ Sergent Johnson</Text>

               <RetryButton onPress={getAlbumInfo} />
            </View>
         )}
      </View>
   );
};

export default AlbumScreen;

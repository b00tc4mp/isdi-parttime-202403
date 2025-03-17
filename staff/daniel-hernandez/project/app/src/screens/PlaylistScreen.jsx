import { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import useNotification from '../hooks/useNotification';
import { useTrackStore } from '../store/track';
import SpinningLoader from '../components/loaders/SpinningLoader';
import RetryButton from '../components/buttons/RetryButton';
import PlaylistHeader from '../components/PlaylistHeader';
import PlaylistTrackList from '../components/lists/PlaylistTrackList';
import formatSeconds from '../utils/formatSeconds';
import { trigger } from 'react-native-haptic-feedback';
import services from '../services';

const PlaylistScreen = ({ route }) => {
   const { playlistId, isDynamic, dynamicPlaylist } = route.params; /* isDynamic: true or null/undefined, dynamicPlaylist: { name, description, tracks } */
   const { notify, notificationTypes } = useNotification();
   const currentTrackId = useTrackStore(state => state.currentTrackId);

   const [loading, setLoading] = useState(true);
   const [playlistInfo, setPlaylistInfo] = useState(null);

   useEffect(() => {
      if (isDynamic) {
         setPlaylistInfo({
            ...dynamicPlaylist,
            duration: formatSeconds(dynamicPlaylist.tracks.reduce((sum, track) => sum + Number(track.duration), 0)),
            cannotBeFollowed: true,
            isDynamic: isDynamic
         });
         setLoading(false);
      } else {
         getPlaylistInfo();
      }
   }, [playlistId]);

   const getPlaylistInfo = useCallback(async () => {
      try {
         setLoading(true);

         const info = isDynamic
            ? {
                 ...dynamicPlaylist,
                 duration: formatSeconds(dynamicPlaylist.tracks.reduce((sum, track) => sum + Number(track.duration), 0)),
                 cannotBeFollowed: true,
                 isDynamic: isDynamic
              }
            : await services.getPlaylistInfo(playlistId);

         setPlaylistInfo(info);
      } catch {
         notify("Yeaozers couldn't get playlist...", notificationTypes.error);
         setPlaylistInfo(null);
      } finally {
         setLoading(false);
      }
   }, [playlistId, notify, isDynamic, dynamicPlaylist]);

   const toggleFollowStatus = useCallback(prevInfo => {
      const updatedInfo = { ...prevInfo };
      const following = updatedInfo.isFollowed;

      return {
         ...updatedInfo,
         isFollowed: !following,
         followers: following ? parseInt(updatedInfo.followers) - 1 : parseInt(updatedInfo.followers) + 1
      };
   });

   const handleFollow = async id => {
      if (isDynamic) return;

      trigger('impactMedium');
      setPlaylistInfo(prevInfo => toggleFollowStatus(prevInfo));

      try {
         await services.followPlaylist(id);
      } catch {
         notify('Something went wrong...', notificationTypes.error);
         setPlaylistInfo(prevInfo => toggleFollowStatus(prevInfo));
      }
   };

   // TODO: create skeleton loader/placeholder ui of this screen
   return (
      <View className="flex-1 bg-palette-90">
         {!loading && playlistInfo && (
            <PlaylistTrackList className="top-0" isDynamic={isDynamic} items={playlistInfo.tracks} playlistId={playlistId} contentContainerStyle={{ paddingBottom: currentTrackId ? 150 : 85 }} ListHeaderComponent={<PlaylistHeader item={playlistInfo} onAdd={handleFollow} />} />
         )}

         {loading && !playlistInfo && (
            <View className="flex-1 justify-center items-center">
               <SpinningLoader tintColor="#E36526" />
            </View>
         )}

         {!playlistInfo && !loading && (
            <View className="flex-1 items-center justify-center">
               <Text className="font-monaspace text-palette-40 text-[15px] mb-1.5">Something went wrong.</Text>
               <Text className="font-monaspace text-palette-40 text-[11px] leading-normal">God's in his heaven, All's right with the world.</Text>

               <RetryButton onPress={getPlaylistInfo} />
            </View>
         )}
      </View>
   );
};

export default PlaylistScreen;

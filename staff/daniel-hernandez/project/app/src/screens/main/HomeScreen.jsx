import { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import Config from 'react-native-config';
import SpinningLoader from '../../components/loaders/SpinningLoader';
import RetryButton from '../../components/buttons/RetryButton';
import HomeTrackList from '../../components/lists/HomeTrackList';
import RefreshableScrollView from '../../components/RefreshableScrollView';
import DynamicPlaylistList from '../../components/lists/DynamicPlaylistList';
import { useTrackStore } from '../../store/track';
import useNotification from '../../hooks/useNotification';
import services from '../../services';
import generateBasicId from '../../utils/generateBasicId';

const HomeScreen = () => {
   const { notify, notificationTypes } = useNotification();

   const [loading, setLoading] = useState(true);
   const [curatedLists, setCuratedLists] = useState(null);
   const [recentPlays, setRecentPlays] = useState(null);

   useEffect(() => {
      getHomeData();
   }, []);

   const getHomeData = useCallback(async () => {
      try {
         setLoading(true);

         const [curatedResponse, recentResponse] = await Promise.all([services.getCuratedLists(), services.getRecentPlays()]);

         const { currentTrackId, currentPlaylistId } = useTrackStore.getState();
         // Handle recent and most played ids
         let newRecentId, newMostPlayedId, newLikedTracksId, newFollowedMixId, newDiscoverWeeklyId;

         // Handle recent played tracks playlist id
         const recentTrackExists = recentResponse?.tracks?.some(t => t.id === currentTrackId);
         newRecentId = currentPlaylistId?.startsWith(Config.RECENT_TRACKS_DYNAMIC_PREFIX) && recentTrackExists ? currentPlaylistId : generateBasicId(Config.RECENT_TRACKS_DYNAMIC_PREFIX);

         // Handle most played tracks playlist id
         const mostPlayedTrackExists = curatedResponse?.mostPlayed?.tracks?.some(t => t.id === currentTrackId);
         newMostPlayedId = currentPlaylistId?.startsWith(Config.MOST_PLAYED_DYNAMIC_PREFIX) && mostPlayedTrackExists ? currentPlaylistId : generateBasicId(Config.MOST_PLAYED_DYNAMIC_PREFIX);

         // Handle liked tracks playlist id
         const likedTracksTrackExists = curatedResponse?.likedTracks?.tracks?.some(t => t.id === currentTrackId);
         newLikedTracksId = currentPlaylistId?.startsWith(Config.LIKED_TRACKS_DYNAMIC_PREFIX) && likedTracksTrackExists ? currentPlaylistId : generateBasicId(Config.LIKED_TRACKS_DYNAMIC_PREFIX);

         // Handle followed mix playlist id
         const followedMixTrackExists = curatedResponse?.followedMix?.tracks?.some(t => t.id === currentTrackId);
         newFollowedMixId = currentPlaylistId?.startsWith(Config.FOLLOWED_MIX_DYNAMIC_PREFIX) && followedMixTrackExists ? currentPlaylistId : generateBasicId(Config.FOLLOWED_MIX_DYNAMIC_PREFIX);

         const discoverWeeklyTrackExists = curatedResponse?.discoverWeekly?.tracks?.some(t => t.id === currentTrackId);
         newDiscoverWeeklyId = currentPlaylistId?.startsWith(Config.DISCOVER_WEEKLY_DYNAMIC_PREFIX) && discoverWeeklyTrackExists ? currentPlaylistId : generateBasicId(Config.DISCOVER_WEEKLY_DYNAMIC_PREFIX);

         // Update state
         setRecentPlays({ ...recentResponse, id: newRecentId });

         setCuratedLists({
            ...curatedResponse,
            mostPlayed: {
               ...curatedResponse.mostPlayed,
               id: newMostPlayedId
            },
            likedTracks: {
               ...curatedResponse.likedTracks,
               id: newLikedTracksId
            },
            followedMix: {
               ...curatedResponse.followedMix,
               id: newFollowedMixId
            },
            discoverWeekly: {
               ...curatedResponse.discoverWeekly,
               id: newDiscoverWeeklyId
            }
         });

         // Update store
         if (currentPlaylistId === newRecentId) {
            const newIndex = recentResponse.tracks.findIndex(t => t.id === currentTrackId);

            useTrackStore.setState({
               currentPlaylist: recentResponse.tracks,
               currentTrackIndex: newIndex
            });
         } else if (currentPlaylistId === newMostPlayedId) {
            const newIndex = curatedResponse.mostPlayed.tracks.findIndex(t => t.id === currentTrackId);

            useTrackStore.setState({
               currentPlaylist: curatedResponse.mostPlayed.tracks,
               currentTrackIndex: newIndex
            });
         } else if (currentPlaylistId === newLikedTracksId) {
            const newIndex = curatedResponse.likedTracks.tracks.findIndex(t => t.id === currentTrackId);

            useTrackStore.setState({
               currentPlaylist: curatedResponse.likedTracks.tracks,
               currentTrackIndex: newIndex
            });
         } else if (currentPlaylistId === newFollowedMixId) {
            const newIndex = curatedResponse.followedMix.tracks.findIndex(t => t.id === currentTrackId);

            useTrackStore.setState({
               currentPlaylist: curatedResponse.followedMix.tracks,
               currentTrackIndex: newIndex
            });
         } else if (currentPlaylistId === newDiscoverWeeklyId) {
            const newIndex = curatedResponse.discoverWeekly.tracks.findIndex(t => t.id === currentTrackId);

            useTrackStore.setState({
               currentPlaylist: curatedResponse.discoverWeekly.tracks,
               currentTrackIndex: newIndex
            });
         }
      } catch {
         notify('Dang! failed to get home..', notificationTypes.error);

         // Reset state
         setCuratedLists(null);
         setRecentPlays(null);
      } finally {
         setLoading(false);
      }
   }, [notify]);

   return (
      <View className="flex-1 bg-palette-90">
         {!loading && curatedLists && recentPlays && (
            <RefreshableScrollView onRefresh={getHomeData} loading={loading}>
               <HomeTrackList items={recentPlays?.tracks} listTitle={'Recently Played Tracks'} playlistId={recentPlays.id} emptyTitle={'Hmm..'} emptyBody={"Seems like you haven't played any tracks yet..."} />
               <DynamicPlaylistList
                  items={[
                     { ...curatedLists?.likedTracks, id: curatedLists?.likedTracks?.id },
                     { ...curatedLists?.followedMix, id: curatedLists?.followedMix?.id },
                     { ...curatedLists?.discoverWeekly, id: curatedLists?.discoverWeekly?.id }
                  ]}
               />
               <HomeTrackList items={curatedLists?.mostPlayed?.tracks} listTitle={curatedLists?.mostPlayed?.name} playlistId={curatedLists?.mostPlayed?.id} emptyTitle={'Interesting...'} emptyBody={"It seems like you haven't listened to anything yet..."} />
            </RefreshableScrollView>
         )}

         {loading && (!curatedLists || !recentPlays) && (
            <View className="flex-1 justify-center items-center">
               <SpinningLoader tintColor="#E36526" />
            </View>
         )}

         {(!curatedLists || !recentPlays) && !loading && (
            <View className="flex-1 items-center justify-center">
               <Text className="font-monaspace text-palette-40 text-[15px] mb-1.5">Something went wrong.</Text>
               <Text className="font-monaspace text-palette-40 text-[11px] leading-normal mx-10">We all fail. We all make mistakes. It's what makes us human.</Text>

               <RetryButton onPress={getHomeData} />
            </View>
         )}
      </View>
   );
};

export default HomeScreen;

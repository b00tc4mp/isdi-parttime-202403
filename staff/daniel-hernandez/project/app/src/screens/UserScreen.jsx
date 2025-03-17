import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import useNotification from '../hooks/useNotification';
import { useTrackStore } from '../store/track';
import SpinningLoader from '../components/loaders/SpinningLoader';
import RetryButton from '../components/buttons/RetryButton';
import ProfileHeader from '../components/ProfileHeader';
import ProfileButtonSet from '../components/ProfileButtonSet';
import ProfileTrackList from '../components/lists/ProfileTrackList';
import ProfilePlaylistList from '../components/lists/ProfilePlaylistList';
import ProfileAlbumList from '../components/lists/ProfileAlbumList';
import { trigger } from 'react-native-haptic-feedback';
import services from '../services';

const UserScreen = ({ route }) => {
   const { userId } = route.params;
   const { notify, notificationTypes } = useNotification();
   const currentTrackId = useTrackStore(state => state.currentTrackId);

   const [loading, setLoading] = useState(true);
   const [userInfo, setUserInfo] = useState(null);

   useEffect(() => {
      getUserInfo();
   }, [userId]);

   const getUserInfo = useCallback(async () => {
      try {
         setLoading(true);

         const info = await services.getUserInfo(userId);
         setUserInfo(info);
      } catch {
         notify("Whoops, couldn't get profile...", notificationTypes.error);
         setUserInfo(null);
      } finally {
         setLoading(false);
      }
   }, [userId, notify]);

   const toggleFollowStatus = useCallback(prevInfo => {
      const updatedInfo = { ...prevInfo };
      const following = updatedInfo.isFollowed;

      return {
         ...updatedInfo,
         isFollowed: !following,
         followers: following ? parseInt(updatedInfo.followers) - 1 : parseInt(updatedInfo.followers) + 1
      };
   });

   const handleFollowUser = async id => {
      trigger('impactMedium');
      setUserInfo(prevInfo => toggleFollowStatus(prevInfo));

      try {
         await services.followUser(id);
      } catch {
         notify('Something went wrong..', notificationTypes.error);
         setUserInfo(prevInfo => toggleFollowStatus(prevInfo));
      }
   };

   // TODO: create a skeleton loader / placeholder ui of the user screen to display instead of just a spinning loader
   return (
      <View className="flex-1 bg-palette-90">
         {!loading && userInfo && (
            <ScrollView className="top-0" contentContainerStyle={{ paddingBottom: currentTrackId ? 150 : 85 }}>
               <ProfileHeader item={userInfo} />
               <ProfileButtonSet item={userInfo} onFollowPress={handleFollowUser} />
               <ProfileTrackList items={userInfo.tracks} />
               <ProfilePlaylistList items={userInfo.playlists} />
               <ProfileAlbumList items={userInfo.albums} />
            </ScrollView>
         )}

         {loading && !userInfo && (
            <View className="flex-1 justify-center items-center">
               <SpinningLoader tintColor="#E36526" />
            </View>
         )}

         {!userInfo && !loading && (
            <View className="flex-1 items-center justify-center">
               <Text className="font-monaspace text-palette-40 text-[15px] mb-1.5">Something went wrong.</Text>
               <Text className="font-monaspace text-palette-40 text-[12px] leading-normal">{`"Never send a human to do a machine's job"
~ Agent Smith`}</Text>

               <RetryButton onPress={getUserInfo} />
            </View>
         )}
      </View>
   );
};

export default UserScreen;

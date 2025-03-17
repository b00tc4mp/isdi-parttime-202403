import { useState, useEffect } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ItemIcons } from '../../../assets/images/icons';
import { useAuthStore } from '../../store/auth';
import useNotification from '../../hooks/useNotification';
import extractPayload from '../../utils/extractPayload';

const UserItem = ({ item, onAdd }) => {
   const navigation = useNavigation();
   const userToken = useAuthStore(state => state.userToken);
   const { notify, notificationTypes } = useNotification();
   const [currentUserId, setCurrentUserId] = useState(null);

   useEffect(() => {
      try {
         const { sub } = extractPayload(userToken);
         setCurrentUserId(sub);
      } catch {
         notify("well.. that's not supposed to happen", notificationTypes.error);
      }
   }, [userToken]);

   return (
      <Pressable key={item.id} className="py-2 flex-row items-start w-[100%] px-5 active:bg-palette-80 bg-palette-90" onPress={() => navigation?.navigate('UserScreen', { userId: item.id })}>
         <Image source={item.profileImage ? { uri: item.profileImage } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-full mr-3" />

         <View className="flex-1 justify-start pt-3">
            <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
               {item.username}
            </Text>

            <Text className="text-palette-40 font-spacemono text-xs leading-tight" numberOfLines={1} ellipsizeMode="tail">
               {`${item.followers} ${parseInt(item.followers) === 0 || parseInt(item.followers) > 1 ? 'followers' : 'follower'}`}
            </Text>
         </View>

         {item.id !== currentUserId && (
            <Pressable
               className="self-center h-5 w-5 ml-2"
               onPress={event => {
                  event.stopPropagation();
                  onAdd(item.id);
               }}
            >
               <Image source={item.isFollowed ? ItemIcons.checkIcon : ItemIcons.addIcon} className="self-center h-4 w-4 my-auto" resizeMode="contain" />
            </Pressable>
         )}
      </Pressable>
   );
};

export default UserItem;

import { useState, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import { useAuthStore } from '../store/auth';
import useNotification from '../hooks/useNotification';
import extractPayload from '../utils/extractPayload';

const ProfileButtonSet = ({ item, onFollowPress }) => {
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
      <View className="bg-palette-90 w-full mt-1.5">
         <View className="bg-palette-80 mx-5 p-3 rounded-3xl flex-row justify-between">
            <Pressable
               onPress={event => {
                  event.stopPropagation();
                  onFollowPress(item.id);
               }}
               disabled={item?.id === currentUserId}
               className="border-[1.2px] rounded-full h-7 w-auto px-4 justify-center bg-palette-80 border-palette-40"
            >
               <Text disabled={true} className="text-center font-spacemono text-sm opacity-100 text-palette-40">
                  {item?.id === currentUserId ? '[~]' : item?.isFollowed ? 'Following' : 'Follow'}
               </Text>
            </Pressable>
         </View>
      </View>
   );
};

export default ProfileButtonSet;

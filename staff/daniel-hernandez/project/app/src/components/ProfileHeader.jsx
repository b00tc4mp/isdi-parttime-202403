import { View, Image, Text } from 'react-native';

const ProfileHeader = ({ item }) => (
   <View className="bg-palette-90 w-full mt-1.5">
      <View className="bg-palette-80 mx-5 rounded-3xl p-3 flex-row">
         <View className="w-24 items-center justify-center">
            <Image source={item.profileImage ? { uri: item.profileImage } : require('../../assets/images/extras/unknown.png')} resizeMode="contain" className="rounded-full w-24 h-24" />
            <Text className="text-palette-40 font-spacemono-bold text-sm mt-0.5" numberOfLines={1} ellipsizeMode="tail">
               {item.username}
            </Text>
         </View>

         <View className="flex-1 mt-9">
            <View className="flex-row justify-evenly items-center">
               {['followers', 'following'].map(label => (
                  <View key={label} className="flex-1 items-center">
                     <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
                        {label}
                     </Text>
                  </View>
               ))}
            </View>

            <View className="flex-row justify-evenly items-start flex-1">
               {[item.followers, item.following].map((value, index) => (
                  <View key={index} className="flex-1 items-center">
                     <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
                        {value !== undefined && value !== null ? value : 'N/A'}
                     </Text>
                  </View>
               ))}
            </View>
         </View>
      </View>
   </View>
);

export default ProfileHeader;

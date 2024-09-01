import { View, Text, Pressable, SafeAreaView } from 'react-native';

// TODO: Header ellipse color and letter should be dynamic
const Header = ({ title, navigation, routeName }) => {
   return (
      <SafeAreaView className="bg-palette-90">
         <View className="flex flex-row w-[100%] h-[65px] px-5 items-center">
            <View className="h-[35px] w-[35px]">
               <Pressable onPress={() => navigation.toggleDrawer()}>
                  <View className="bg-palette-60 h-[100%] w-[100%] justify-center items-center rounded-full">
                     <Text className="text-palette-90 font-poppins-bold text-2xl text-center">u</Text>
                  </View>
               </Pressable>
            </View>

            <Text className="text-palette-40 font-poppins-semibold text-xl px-2">{title}</Text>

            <View className="flex flex-1" />

            {routeName === 'LibraryTab' && (
               <View className="flex flex-row">
                  {/* 24px */}
                  <Pressable onPress={() => {}}>
                     <Text className="text-palette-40 font-monaspace text-base">{'<!>'}</Text>
                  </Pressable>

                  <Pressable onPress={() => {}} className="mx-5">
                     <Text className="text-palette-40 font-monaspace text-base">{'<!>'}</Text>
                  </Pressable>

                  <Pressable onPress={() => {}}>
                     <Text className="text-palette-40 font-monaspace text-base">{'<!>'}</Text>
                  </Pressable>
               </View>
            )}
         </View>
      </SafeAreaView>
   );
};

export default Header;

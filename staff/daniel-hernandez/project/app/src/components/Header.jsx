import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// TODO: Componentize
// TODO: Header ellipse color and letter should be dynamic
const Header = ({ title, navigation }) => {
   const insets = useSafeAreaInsets();

   return (
      <View className="bg-palette-90 w-[100%] z-50" style={{ paddingTop: insets.top - 5, paddingBottom: insets.bottom - 35, paddingLeft: insets.left, paddingRight: insets.right }}>
         <View className="flex flex-row px-5 items-center h-[65px]">
            <View className="h-[35px] w-[35px]">
               <Pressable onPress={() => navigation?.toggleDrawer()}>
                  <View className="bg-palette-60 h-[100%] w-[100%] justify-center items-center rounded-full">
                     <Text className="text-palette-90 font-poppins-bold text-2xl text-center">u</Text>
                  </View>
               </Pressable>
            </View>

            <Text className="text-palette-40 font-poppins-semibold text-xl px-2">{title}</Text>

            <View className="flex flex-1" />

            {title === 'Library.' && (
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
      </View>
   );
};

export default Header;

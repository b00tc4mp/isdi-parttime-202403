import { View, Text, Pressable } from 'react-native';

/* pills array should look something like this:

   [
      {
         label: 'pill name',
         onPress: () => do things,
         ...
      },
      ...
   ]

*/

const PillBar = ({ pills = [], selectedPill = '', className = '' }) => {
   return (
      <View className={`${className} flex flex-row gap-2`}>
         {pills.map((pill, index) => (
            <Pressable key={index} onPress={() => (pill?.onPress ? pill.onPress(pill) : () => {})} className="bg-palette-80 px-2.5 py-1.5 rounded-full">
               <Text className={`text-sm ${selectedPill === pill.label ? 'font-spacemono-bold text-palette-30' : 'font-spacemono text-palette-40'}`}>{pill?.label}</Text>
            </Pressable>
         ))}
      </View>
   );
};

export default PillBar;

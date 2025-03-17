import { Pressable, Text } from 'react-native';

const RetryButton = ({ onPress }) => (
   <Pressable onPress={onPress} className="bg-palette-40 rounded-full h-10 mt-3 px-4 justify-center active:bg-palette-50">
      <Text className="text-center font-poppins-medium text-palette-90 text-base">Try again</Text>
   </Pressable>
);

export default RetryButton;

import { Pressable, Text } from 'react-native';

const ContinueButton = ({ onPress }) => {
   return (
      <Pressable onPress={onPress} className="bg-palette-40 rounded-md h-[43] mt-5 mx-[2.5rem] justify-center">
         <Text className="text-center font-poppins-medium text-palette-90">Continue</Text>
      </Pressable>
   );
};

export default ContinueButton

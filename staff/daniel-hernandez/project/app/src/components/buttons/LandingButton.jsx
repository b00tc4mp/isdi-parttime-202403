import { Pressable, Text } from 'react-native';

const LandingButton = ({ text, onPress, bgColor = 'bg-palette-30', textColor = 'text-palette-40', marginTop = '' }) => {
   return (
      <Pressable onPress={onPress} className={`${bgColor} ${marginTop} p-3.5 rounded-full mx-[1.5rem]`}>
         <Text className={`font-poppins-bold ${textColor} text-center text-base`}>{text}</Text>
      </Pressable>
   );
};

export default LandingButton;

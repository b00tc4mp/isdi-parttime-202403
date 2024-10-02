import { Pressable, Text } from 'react-native';

const LandingButton = ({ text, onPress, className = 'bg-palette-30' }) => {
   return (
      <Pressable onPress={onPress} className={`${className} p-3.5 rounded-full mx-[1.5rem]`}>
         <Text className={`font-poppins-bold text-center text-base text-palette-40`}>{text}</Text>
      </Pressable>
   );
};

export default LandingButton;

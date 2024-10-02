import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { SafeAreaView, View, Text } from 'react-native';
import FloatingLabelTextInput from '../../components/FloatingLabelTextInput';
import ContinueButton from '../../components/buttons/ContinueButton';
import validate from 'com/validation';

// TODO: Add loading state
// TODO: Make dynamic messages prettier
// TODO: More cohesive visual experience (connection error)
const UsernameInputScreen = ({ route }) => {
   const { email, password } = route.params;
   const { signUp } = useAuth();

   const [username, setUsername] = useState('');
   const [signUpError, setSignUpError] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [invalidUsername, setInvalidUsername] = useState(false);

   const handleUsernameChange = text => {
      setUsername(text);

      setIsSubmitted(false);
      setSignUpError(false);
      setInvalidUsername(false);
   };

   const handleUsernameSubmit = async () => {
      setIsSubmitted(true);

      try {
         validate.username(username);
      } catch {
         setInvalidUsername(true);
         return;
      }

      try {
         const success = await signUp(email, password, username);
         if (success) {
            setSignUpError(false);
         } else {
            setSignUpError(true);
         }
      } catch {
         setSignUpError(true);
      }

      return;
   };

   return (
      <SafeAreaView className="flex-1 items-center bg-palette-90">
         <View className="top-52 w-[100%] items-center">
            <Text className="text-palette-40 text-start font-poppins-bold text-[33px] leading-[40px] mx-[2rem]">Create your display username</Text>
         </View>

         <View className="flex-1 top-60 w-[100%]">
            <FloatingLabelTextInput label="Display name (min.5)" value={username} onChangeText={handleUsernameChange} className={`${!isSubmitted ? 'border-none' : invalidUsername ? 'border border-extras-30' : signUpError ? 'border border-extras-60' : 'border-none'}`} />

            {isSubmitted && invalidUsername && !signUpError && <Text className="font-poppins-medium text-extras-30 text-xs text-start mx-[3.5rem] mt-[0.4rem]">Enter a valid username</Text>}

            {!isSubmitted && <Text className=" font-poppins-medium text-palette-10 text-xs text-start mx-[3.5rem] mt-[0.4rem]">Use 5-15 characters, no special symbols and avoid consecutive dots or underscores.</Text>}

            <ContinueButton onPress={handleUsernameSubmit} />
         </View>
      </SafeAreaView>
   );
};

export default UsernameInputScreen;

import { useContext, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable } from 'react-native';
import AuthContext from '../context/AuthContext';
import validate from 'com/validation';

// TODO: Add loading state
// TODO: Make dynamic messages prettier
// TODO: More cohesive visual experience (connection error)
const UsernameInputScreen = ({ route }) => {
   const { email, password } = route.params;
   const { signUp } = useContext(AuthContext);

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
         const success = await signUp({ email, password, username });
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
         <View className="top-52">
            <Text className="text-palette-40 text-start font-poppins-bold text-4xl">Create your display username</Text>
         </View>

         <View className="flex-1 top-60 w-[100%]">
            <TextInput
               placeholder="Display name"
               value={username}
               onChangeText={handleUsernameChange}
               keyboardType="default"
               autoCapitalize="none"
               selectionColor="#E36526"
               className={`rounded-md h-[43] mx-[2.5rem] bg-palette-80 placeholder:text-palette-40 placeholder:font-poppins-medium placeholder:text-sm placeholder:p-3 text-palette-40 ${
                  !isSubmitted ? 'border-none' : invalidUsername ? 'border border-extras-30' : signUpError ? 'border border-extras-60' : 'border-none'
               }`}
            />

            {isSubmitted && invalidUsername && !signUpError && <Text className="font-poppins-medium text-extras-30 text-xs text-start mx-[3.5rem] mt-[0.4rem]">Enter a valid username</Text>}

            {!isSubmitted && <Text className=" font-poppins-medium text-palette-10 text-xs text-start mx-[3.5rem] mt-[0.4rem]">Use 5-15 characters, no special symbols, and avoid consecutive dots or underscores.</Text>}

            <Pressable onPress={handleUsernameSubmit} className="bg-palette-40 rounded-md h-[43] mt-5 mx-[2.5rem] justify-center">
               <Text className="text-center font-poppins-medium text-palette-90">Continue</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
};

export default UsernameInputScreen;

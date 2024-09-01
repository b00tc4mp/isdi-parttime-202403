import { useState, useContext } from 'react';
import { Pressable, Text, TextInput, View, SafeAreaView } from 'react-native';
import AuthContext from '../context/AuthContext';
import validate from 'com/validation';

// TODO: Add loading state
// TODO: More cohesive visual experience (connection error)
const PasswordInputScreen = ({ route, navigation }) => {
   const { email, emailExists } = route.params;
   const { signIn } = useContext(AuthContext);

   const [password, setPassword] = useState('');
   const [feedback, setFeedback] = useState({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false
   });
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [signInError, setSignInError] = useState(false);
   const [invalidPassword, setInvalidPassword] = useState(false);

   const handlePasswordChange = text => {
      setPassword(text);
      setFeedback({
         length: text.length >= 8,
         uppercase: /[A-Z]/.test(text),
         lowercase: /[a-z]/.test(text),
         number: /[0-9]/.test(text),
         specialChar: /[#?!@$%^&*-]/.test(text)
      });

      setIsSubmitted(false);
      setSignInError(false);
      setInvalidPassword(false);
   };

   const handlePasswordSubmit = async () => {
      setIsSubmitted(true);

      try {
         validate.password(password);
      } catch {
         setInvalidPassword(true);
         return;
      }

      if (emailExists) {
         try {
            const success = await signIn({ email, password });
            if (success) {
               setSignInError(false);
            } else {
               setSignInError(true);
            }
         } catch {
            setSignInError(true);
         }

         return;
      }

      navigation.navigate('UsernameInput', { email, password });
   };

   return (
      <SafeAreaView className="flex-1 bg-palette-90 items-center">
         <View className="top-48">
            <Text className="text-palette-40 text-start font-poppins-bold text-4xl">{emailExists ? 'Welcome Back!' : 'Create an account'}</Text>
         </View>

         <View className="top-[13.5rem] w-[100%]">
            <Text className="font-poppins-medium text-sm mb-[-5] text-start mx-[3.3rem] text-palette-40">Your email address:</Text>
            <Text className="font-poppins-semibold text-base text-start mx-[3.3rem] text-palette-40">{email}</Text>
         </View>

         <View className="flex-1 top-60 w-[100%]">
            <TextInput
               placeholder={`${emailExists ? 'Your password (min. 8)' : 'Choose a password (min. 8)'}`}
               value={password}
               onChangeText={handlePasswordChange}
               secureTextEntry
               selectionColor="#E36526"
               className={`rounded-md h-[43] mx-[2.5rem] bg-palette-80 placeholder:text-palette-40 placeholder:font-poppins-medium placeholder:text-sm placeholder:p-3 text-palette-40 ${
                  !isSubmitted ? 'border-none' : invalidPassword ? 'border border-extras-30' : signInError ? 'border border-extras-60' : 'border-none'
               }`}
            />

            {isSubmitted && emailExists && invalidPassword && !signInError && <Text className="font-poppins-medium text-extras-30 text-xs text-start mx-[3.5rem] mt-[0.4rem]">Enter a valid password</Text>}

            {!emailExists && (
               <View className="mx-[2.5rem] mt-2">
                  <Text className="text-sm text-palette-40">{feedback.length ? '✓' : '✗'} At least 8 characters</Text>
                  <Text className="text-sm text-palette-40">{feedback.uppercase ? '✓' : '✗'} At least one uppercase letter</Text>
                  <Text className="text-sm text-palette-40">{feedback.lowercase ? '✓' : '✗'} At least one lowercase letter</Text>
                  <Text className="text-sm text-palette-40">{feedback.number ? '✓' : '✗'} At least one number</Text>
                  <Text className="text-sm text-palette-40">{feedback.specialChar ? '✓' : '✗'} At least one special character (#?!@$%^&*-)</Text>
               </View>
            )}

            <Pressable onPress={handlePasswordSubmit} className="bg-palette-40 rounded-md h-[43] mt-5 mx-[2.5rem] justify-center">
               <Text className="text-center font-poppins-medium text-palette-90">Continue</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
};

export default PasswordInputScreen;

import { useState, useContext } from 'react';
import { Text, View, TextInput, Pressable, SafeAreaView } from 'react-native';
import AuthContext from '../context/AuthContext';
import validate from 'com/validation';

// TODO: Add loading state
const EmailInputScreen = ({ navigation }) => {
   const { checkEmail } = useContext(AuthContext);
   const [email, setEmail] = useState('');
   const [feedback, setFeedback] = useState('');

   const handleEmailChange = async text => {
      setEmail(text);
      setFeedback('');
   };

   const handleEmailCheck = async () => {
      let emailExists;

      try {
         validate.email(email);
      } catch {
         setFeedback('Enter a valid email address');
         return;
      }

      try {
         emailExists = await checkEmail({ email });
         validate.inputs(emailExists);
      } catch {
         setFeedback('Something went wrong. Please try again later');
         return;
      }

      navigation.navigate('PasswordInput', { email, emailExists });
   };

   return (
      <SafeAreaView className="flex-1 bg-palette-90 items-center">
         <View className="top-52">
            <Text className="text-palette-40 text-start font-poppins-bold text-4xl">Sign in or create an account</Text>
         </View>

         <View className="flex-1 top-60 w-[100%]">
            {/* TODO: floating label */}
            <TextInput
               placeholder="Your email address"
               value={email}
               onChangeText={handleEmailChange}
               keyboardType="email-address"
               autoCapitalize="none"
               selectionColor="#E36526"
               className={`${feedback ? 'border border-extras-30' : ''} rounded-md h-[43] mx-[2.5rem] bg-palette-80 placeholder:text-palette-40 placeholder:font-poppins-medium placeholder:text-sm placeholder:p-3 text-palette-40`}
            />

            {feedback && <Text className="font-poppins-medium text-extras-30 text-xs text-start mx-[3.5rem] mt-[0.4rem]">{feedback}</Text>}

            <Pressable onPress={handleEmailCheck} className="bg-palette-40 rounded-md h-[43] mt-5 mx-[2.5rem] justify-center">
               <Text className="text-center font-poppins-medium text-palette-90">Continue</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
};

export default EmailInputScreen;

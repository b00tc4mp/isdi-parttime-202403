import { useState, useContext } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import FloatingLabelTextInput from '../../components/FloatingLabelTextInput';
import ContinueButton from '../../components/buttons/ContinueButton';
import AuthContext from '../../context/AuthContext';
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
         <View className="top-52 w-[100%] items-center">
            <Text className="text-palette-40 text-start font-poppins-bold text-[36px] leading-[40px] mx-[2.3rem]">Sign in or create an account</Text>
         </View>

         <View className="flex-1 top-60 w-[100%]">
            <FloatingLabelTextInput label="Your email address" value={email} onChangeText={handleEmailChange} keyboardType="email-address" error={feedback} />

            {feedback && <Text className="font-poppins-medium text-extras-30 text-xs text-start mx-[3.5rem] mt-[0.4rem]">{feedback}</Text>}

            <ContinueButton onPress={handleEmailCheck} />
         </View>
      </SafeAreaView>
   );
};

export default EmailInputScreen;

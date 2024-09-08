import { useState, useContext } from 'react';
import { Text, View, SafeAreaView, Image } from 'react-native';
import { InputIcons } from '../../../assets/images/icons';
import FloatingLabelTextInput from '../../components/FloatingLabelTextInput';
import ContinueButton from '../../components/buttons/ContinueButton';
import AuthContext from '../../context/AuthContext';
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
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
         <View className="top-48 w-[100%] items-center">
            <Text className="text-palette-40 text-start font-poppins-bold text-[36px] leading-[40px]">{emailExists ? 'Welcome Back!' : 'Create an account'}</Text>
         </View>

         <View className="top-[13.5rem] w-[100%]">
            <Text className="font-poppins-medium text-sm mb-[-5] text-start mx-[3.3rem] text-palette-40">Your email address:</Text>
            <Text className="font-poppins-semibold text-base text-start mx-[3.3rem] text-palette-40">{email.length > 35 ? email.slice(0, 35).concat('...') : email}</Text>
         </View>

         <View className="flex-1 top-60 w-[100%]">
            <FloatingLabelTextInput
               label={`${emailExists ? 'Your password (min. 8)' : 'Choose a password (min.8)'}`}
               value={password}
               onChangeText={handlePasswordChange}
               className={`${!isSubmitted ? 'border-none' : invalidPassword ? 'border border-extras-30' : signInError ? 'border border-extras-60' : 'border-none'}`}
               secureTextEntry={!isPasswordVisible}
               iconRight={<Image source={isPasswordVisible ? InputIcons.eyeIconActive : InputIcons.eyeIcon} resizeMode="contain" className="w-7 h-6" />}
               onIconRightPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />

            {isSubmitted && emailExists && invalidPassword && !signInError && <Text className="font-poppins-medium text-extras-30 text-xs text-start mx-[3.5rem] mt-[0.4rem]">Enter a valid password</Text>}

            {!emailExists && (
               <View className="mx-[2.5rem] mt-2">
                  <Text className={`text-sm ${feedback.length ? 'text-extras-40' : 'text-palette-30'}`}>{feedback.length ? '✓' : '✗'} At least 8 characters</Text>
                  <Text className={`text-sm ${feedback.uppercase ? 'text-extras-40' : 'text-palette-30'}`}>{feedback.uppercase ? '✓' : '✗'} At least one uppercase letter</Text>
                  <Text className={`text-sm ${feedback.lowercase ? 'text-extras-40' : 'text-palette-30'}`}>{feedback.lowercase ? '✓' : '✗'} At least one lowercase letter</Text>
                  <Text className={`text-sm ${feedback.number ? 'text-extras-40' : 'text-palette-30'}`}>{feedback.number ? '✓' : '✗'} At least one number</Text>
                  <Text className={`text-sm ${feedback.specialChar ? 'text-extras-40' : 'text-palette-30'}`}>{feedback.specialChar ? '✓' : '✗'} At least one special character (#?!@$%^&*-)</Text>
               </View>
            )}

            <ContinueButton onPress={handlePasswordSubmit} />
         </View>
      </SafeAreaView>
   );
};

export default PasswordInputScreen;

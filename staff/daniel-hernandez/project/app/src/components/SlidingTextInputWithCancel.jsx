import { useRef, useState } from 'react';
import { View, TextInput, Text, Animated, Pressable, Keyboard, Image } from 'react-native';

import { InputIcons } from '../../assets/images/icons';

const SlidingTextInputWithCancel = ({ placeholder, value, onChangeText, iconLeft, onIconLeftPress, clearIcon = true, onClearPress = () => onChangeText(''), onCancelPress = () => Keyboard.dismiss(), onFocus = () => {}, ...props }) => {
   const inputRef = useRef(null);
   const inputWidth = useRef(new Animated.Value(0)).current;
   const [viewWidth, setViewWidth] = useState(1);

   const handleFocus = () => {
      onFocus();
      Animated.timing(inputWidth, {
         toValue: 1,
         duration: 300,
         useNativeDriver: false
      }).start();
   };

   const handleBlur = () => {
      Animated.timing(inputWidth, {
         toValue: 0,
         duration: 300,
         useNativeDriver: false
      }).start();
   };

   return (
      <View
         className="flex-row items-center w-[90%] h-8"
         onLayout={event => {
            const { width } = event.nativeEvent.layout;
            setViewWidth(width);
         }}
      >
         {iconLeft && (
            <Pressable onPress={onIconLeftPress ? onIconLeftPress : () => inputRef.current.focus()} className="absolute left-0 h-[100%] justify-center p-3 pl-0 z-30">
               {iconLeft}
            </Pressable>
         )}

         <Animated.View
            style={{
               width: inputWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['100%', `${((viewWidth - 67) / viewWidth) * 100}%`]
               })
            }}
            className="flex-row items-center rounded-full bg-palette-90 z-10"
         >
            <TextInput
               ref={inputRef}
               className={`flex-1 px-4 py-1 h-[100%] font-poppins-medium border border-b-palette-60 border-x-transparent border-t-transparent placeholder:text-palette-60 text-palette-60 text-md ${iconLeft ? 'pl-7' : ''} ${clearIcon ? 'pr-7' : ''}`}
               placeholder={placeholder}
               onFocus={handleFocus}
               onBlur={handleBlur}
               value={value}
               onChangeText={onChangeText}
               selectionColor="#E36526"
               autoComplete="off"
               autoCapitalize="none"
               textInputMode="none"
               spellCheck={true}
               autoCorrect={false}
               {...props}
            />

            {clearIcon && value && (
               <Pressable onPress={onClearPress} className="absolute right-0 h-[100%] justify-center p-3 pr-0 z-30">
                  <Image source={InputIcons.clear} resizeMode="contain" className="w-7 h-6" />
               </Pressable>
            )}
         </Animated.View>

         <Pressable
            className="absolute right-0 h-full justify-center px-3 bg-palette-80 rounded-full z-0"
            onPress={() => {
               onCancelPress();
               Keyboard.dismiss();
            }}
         >
            <Text className="text-palette-60 font-poppins-medium text-sm">Cancel</Text>
         </Pressable>
      </View>
   );
};

export default SlidingTextInputWithCancel;

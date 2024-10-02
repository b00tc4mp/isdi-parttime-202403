import { useRef } from 'react';
import { View, TextInput, Easing, Animated, Pressable } from 'react-native';

const FloatingLabelTextInput = ({ label = '', value = '', onChangeText = () => {}, error = false, keyboardType = 'default', autoCapitalize = 'none', selectionColor = '#E36526', floatUpRange = 11, className = '', iconRight, onIconRightPress = () => {}, ...props }) => {
   const moveText = useRef(new Animated.Value(value ? 1 : 0)).current;
   const fontSize = useRef(new Animated.Value(value ? 1 : 0)).current;

   const onFocusHandler = () => {
      moveTextTop();
      props?.onFocus ? props?.onFocus() : () => {};
   };

   const onBlurHandler = () => {
      if (!value) {
         moveTextBottom();
      }
      props?.onBlur ? props?.onBlur() : () => {};
   };

   const moveTextTop = () => {
      Animated.parallel([
         Animated.timing(moveText, {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
         }),
         Animated.timing(fontSize, {
            toValue: 1,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false
         })
      ]).start();
   };

   const moveTextBottom = () => {
      Animated.parallel([
         Animated.timing(moveText, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true
         }),
         Animated.timing(fontSize, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false
         })
      ]).start();
   };

   const yVal = moveText.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -floatUpRange]
   });

   const labelFontSize = fontSize.interpolate({
      inputRange: [0, 1],
      outputRange: [12.3, 9]
   });

   return (
      <View className="mx-[2.5rem] bg-transparent">
         <View className={`${error ? 'border border-extras-30' : ''} ${className} w-[100%] h-[43] bg-palette-80 rounded-md justify-center`}>
            <Animated.View style={[{ transform: [{ translateY: yVal }] }, { position: 'absolute', zIndex: 10, height: '100%', justifyContent: 'center' }]}>
               <Animated.Text style={{ fontSize: labelFontSize }} className="absolute text-palette-40 font-poppins-medium p-3 z-0">
                  {label}
               </Animated.Text>
            </Animated.View>

            <TextInput
               value={value}
               onChangeText={text => onChangeText(text)}
               keyboardType={keyboardType}
               autoCapitalize={autoCapitalize}
               selectionColor={selectionColor}
               onFocus={onFocusHandler}
               onBlur={onBlurHandler}
               secureTextEntry={props.secureTextEntry}
               className={`bg-transparent text-palette-40 z-20 pl-3 font-poppins-medium text-xs pt-2 rounded-md ${iconRight ? 'pr-12' : 'pr-3'}`}
               {...props}
            />

            {iconRight && (
               <Pressable onPress={onIconRightPress} className="absolute right-0 h-[100%] justify-center p-3 z-30">
                  {iconRight}
               </Pressable>
            )}
         </View>
      </View>
   );
};

export default FloatingLabelTextInput;

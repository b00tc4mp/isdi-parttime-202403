import { useRef, useEffect } from 'react';
import { Animated, Text } from 'react-native';

const ToastNotification = ({ message, type = 'info', duration = 3000 }) => {
   const slideAnimation = useRef(new Animated.Value(-100)).current; // Initial pos (above the screen (IOS))

   useEffect(() => {
      if (message) {
         Animated.timing(slideAnimation, {
            toValue: -5,
            duration: 300,
            useNativeDriver: true
         }).start();

         const timer = setTimeout(() => {
            Animated.timing(slideAnimation, {
               toValue: -100,
               duration: 300,
               useNativeDriver: true
            }).start();
         }, duration);

         return () => clearTimeout(timer);
      }
   }, [message]);

   if (!message) return null;

   const borderColorClass = type === 'info' ? 'border-palette-30' : type === 'success' ? 'border-extras-40' : type === 'warning' ? 'border-extras-60' : type === 'error' ? 'border-extras-20' : 'border-palette-80';

   return (
      <Animated.View key={message} className={`absolute top-0 left-0 right-0 mx-5 p-3.5 rounded-lg shadow-lg h-[6.8rem] flex-1 justify-end bg-palette-80 border-2 ${borderColorClass}`} style={{ transform: [{ translateY: slideAnimation }], zIndex: 1000 }}>
         <Text className="text-palette-40 font-poppins-medium text-center">{message}</Text>
      </Animated.View>
   );
};

export default ToastNotification;

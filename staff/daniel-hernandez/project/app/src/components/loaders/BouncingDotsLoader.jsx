import { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';

const BouncingDotsLoader = ({ className }) => {
   const bounce1 = useRef(new Animated.Value(0)).current;
   const bounce2 = useRef(new Animated.Value(0)).current;
   const bounce3 = useRef(new Animated.Value(0)).current;
   const opacity1 = useRef(new Animated.Value(1)).current;
   const opacity2 = useRef(new Animated.Value(1)).current;
   const opacity3 = useRef(new Animated.Value(1)).current;

   useEffect(() => {
      const animateDot = (bounceValue, opacityValue) => {
         return Animated.loop(
            Animated.sequence([
               Animated.parallel([
                  Animated.timing(bounceValue, {
                     toValue: -10,
                     duration: 600,
                     easing: Easing.inOut(Easing.ease),
                     useNativeDriver: true
                  }),
                  Animated.timing(opacityValue, {
                     toValue: 0.1,
                     duration: 600,
                     easing: Easing.inOut(Easing.ease),
                     useNativeDriver: true
                  })
               ]),
               Animated.parallel([
                  Animated.timing(bounceValue, {
                     toValue: 0,
                     duration: 600,
                     easing: Easing.inOut(Easing.ease),
                     useNativeDriver: true
                  }),
                  Animated.timing(opacityValue, {
                     toValue: 1,
                     duration: 600,
                     easing: Easing.inOut(Easing.ease),
                     useNativeDriver: true
                  })
               ])
            ])
         );
      };

      animateDot(bounce1, opacity1).start();
      setTimeout(() => animateDot(bounce2, opacity2).start(), 300);
      setTimeout(() => animateDot(bounce3, opacity3).start(), 600);
   }, []);

   return (
      <View className={`${className} flex-row justify-center items-center self-center z-10`}>
         <Animated.View style={[{ transform: [{ translateY: bounce1 }], opacity: opacity1 }]} className="w-[8] h-[8] mx-[3.5] rounded-full bg-palette-30" />
         <Animated.View style={[{ transform: [{ translateY: bounce2 }], opacity: opacity2 }]} className="w-[8] h-[8] mx-[3.5] rounded-full bg-palette-30" />
         <Animated.View style={[{ transform: [{ translateY: bounce3 }], opacity: opacity3 }]} className="w-[8] h-[8] mx-[3.5] rounded-full bg-palette-30" />
      </View>
   );
};

export default BouncingDotsLoader;

import { useEffect, useRef, useState } from 'react';
import { Animated, View, Pressable, Image, Easing } from 'react-native';
import usePlayerHandlers from '../hooks/usePlayerHandlers';
import FloatingPlayerControllerToggleLoopButton from './buttons/FloatingPlayerToggleLoopButton';
import { ControlIcons } from '../../assets/images/icons';
import { trigger } from 'react-native-haptic-feedback';

const FloatingPlayerController = ({ controllerTrigger, resetTrigger }) => {
   const { handleSkipNext, handleSkipPrevious } = usePlayerHandlers();

   const [visible, setVisible] = useState(false);
   const translateY = useRef(new Animated.Value(0)).current;
   const animating = useRef(false);
   const autoCloseTimer = useRef(null);

   useEffect(() => {
      if (controllerTrigger && !animating.current) openController();
   }, [controllerTrigger]);

   useEffect(() => {
      if (visible) autoCloseTimer.current = setTimeout(closeController, 4000);
      return () => clearTimeout(autoCloseTimer.current);
   }, [visible]);

   const openController = () => {
      if (animating.current || visible) return;

      trigger('impactMedium');
      setVisible(true);
      animating.current = true;

      Animated.timing(translateY, {
         toValue: -50,
         duration: 300,
         easing: Easing.in(Easing.ease),
         useNativeDriver: true
      }).start(() => (animating.current = false));

      clearTimeout(autoCloseTimer.current);
      autoCloseTimer.current = setTimeout(closeController, 4000);
   };

   const closeController = () => {
      if (animating.current || !visible) return;

      animating.current = true;
      Animated.timing(translateY, {
         toValue: 0,
         duration: 300,
         easing: Easing.in(Easing.ease),
         useNativeDriver: true
      }).start(() => {
         setVisible(false);
         animating.current = false;
         resetTrigger();
      });
   };

   return (
      visible && (
         <Animated.View style={{ transform: [{ translateY }] }} className="absolute z-40 h-[32px] w-[40%] bottom-[85px] self-center rounded-[17px] overflow-hidden bg-palette-80">
            <View className="flex-row items-center justify-center w-full h-full">
               <Pressable onPress={handleSkipPrevious} className="items-center justify-center p-2.5">
                  <Image source={ControlIcons.previousIcon} resizeMode="contain" className="h-4 w-4" />
               </Pressable>

               <FloatingPlayerControllerToggleLoopButton />

               <Pressable onPress={handleSkipNext} className="items-center justify-center p-2.5">
                  <Image source={ControlIcons.nextIcon} resizeMode="contain" className="h-4 w-4" />
               </Pressable>
            </View>
         </Animated.View>
      )
   );
};

export default FloatingPlayerController;

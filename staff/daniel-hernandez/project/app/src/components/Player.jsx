import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, Easing, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useActiveTrack } from 'react-native-track-player';
import { ControlIcons } from '../../assets/images/icons';
import { TrackImage, TrackInfo, TrackProgressStats } from './PlayerInfo';
import PlayerProgressbar from './PlayerProgressbar';
import PlayerControls, { ToggleLoopButton } from './PlayerControls';
import { trigger } from 'react-native-haptic-feedback';

const Player = ({ playerTrigger, resetTrigger }) => {
   const activeTrack = useActiveTrack();
   const insets = useSafeAreaInsets();
   const navigation = useNavigation();

   const [visible, setVisible] = useState(false);
   const translateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;

   const panResponder = useRef(
      PanResponder.create({
         onMoveShouldSetPanResponder: (_, gestureState) => {
            // Allow gesture to start only if it's a downward swipe
            return Math.abs(gestureState.dy) > 1;
         },
         onPanResponderMove: (_, gestureState) => {
            // Update the translateY value based on the gesture movement
            translateY.setValue(Math.max(0, gestureState.dy));
         },
         onPanResponderRelease: (_, gestureState) => {
            const { height } = Dimensions.get('window');
            // If the swipe is greater that 100, hide the controller
            if (gestureState.dy > 100) {
               Animated.timing(translateY, {
                  toValue: height,
                  duration: 300,
                  easing: Easing.in(Easing.ease),
                  useNativeDriver: true
               }).start(() => {
                  setVisible(false);
                  translateY.setValue(height);
                  resetTrigger();
               });
            } else {
               // If the swipe is not significant, move it back up to visible position
               Animated.timing(translateY, {
                  toValue: 0,
                  duration: 300,
                  easing: Easing.in(Easing.ease),
                  useNativeDriver: true
               }).start();
            }
         }
      })
   ).current;

   useEffect(() => {
      if (playerTrigger) openPlayer();
   }, [playerTrigger]);

   useEffect(() => navigation?.setOptions({ swipeEnabled: !visible }), [visible]);

   const openPlayer = () => {
      if (visible) return;

      trigger('impactLight');
      setVisible(true);

      Animated.timing(translateY, {
         toValue: 0,
         duration: 250,
         easing: Easing.in(Easing.ease),
         useNativeDriver: true
      }).start();
   };

   return (
      visible && (
         <>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', zIndex: 59 }} />
            <Animated.View style={{ transform: [{ translateY }], paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }} className="absolute z-[60] bg-palette-80 self-center w-full bottom-0 h-[100%] rounded-t-2xl overflow-hidden">
               <View {...panResponder.panHandlers}>
                  <View className="items-center">
                     <Image source={ControlIcons.handleIcon} resizeMode="contain" className="h-4 w-9" />
                  </View>

                  <TrackImage activeTrack={activeTrack} />
               </View>

               <View className="flex-row justify-between pr-6">
                  <TrackInfo activeTrack={activeTrack} />
                  <ToggleLoopButton />
               </View>

               <PlayerProgressbar className="mt-5" />

               <TrackProgressStats />

               <PlayerControls className="mt-10" />
            </Animated.View>
         </>
      )
   );
};

export default Player;

import { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, Animated, Easing, Dimensions, PanResponder } from 'react-native';
import { usePlaybackState, useProgress, State, RepeatMode } from 'react-native-track-player';
import { ControlIcons } from '../../assets/images/icons';
import { BlurView } from 'expo-blur';
import { trigger } from 'react-native-haptic-feedback';
import SpinningLoader from './loaders/SpinningLoader';
import usePlayer from '../hooks/usePlayer';
import useContext from '../hooks/useContext';
import formatSeconds from '../utils/formatSeconds';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// TODO: refactor
const ControlBar = () => {
   const { notify } = useContext();
   const playback = usePlaybackState();
   const { restart, pause, resume, setLoopMode, skipToNext, skipToPrevious, getCurrentState, seekTo } = usePlayer();
   const { position, duration } = useProgress(10);
   const [track, setTrack] = useState({});
   const [render, setRender] = useState(false);

   const [controlMenuVisible, setControlMenuVisible] = useState(false);
   const controlMenuTranslateY = useRef(new Animated.Value(0)).current;
   const isControlMenuAnimating = useRef(false);
   const autoCloseTimer = useRef(null);
   const [isLooping, setIsLooping] = useState(false);

   const insets = useSafeAreaInsets();
   const [controllerVisible, setControllerVisible] = useState(false);
   const controllerTranslateY = useRef(new Animated.Value(Dimensions.get('window').height)).current;
   const controllerPanResponder = useRef(
      PanResponder.create({
         onMoveShouldSetPanResponder: (_, gestureState) => {
            // Allow gesture to start only if it's a downward swipe
            return Math.abs(gestureState.dy) > 1;
         },
         onPanResponderMove: (_, gestureState) => {
            // Update the translateY value based on the gesture movement
            controllerTranslateY.setValue(Math.max(0, gestureState.dy));
         },
         onPanResponderRelease: (_, gestureState) => {
            const { height } = Dimensions.get('window');
            // If the swipe is greater that 100, hide the controller
            if (gestureState.dy > 100) {
               Animated.timing(controllerTranslateY, {
                  toValue: height,
                  duration: 300,
                  easing: Easing.in(Easing.ease),
                  useNativeDriver: true
               }).start(() => {
                  setControllerVisible(false);
                  controllerTranslateY.setValue(height);
               });
            } else {
               // If the swipe is not significant, move it back up to visible position
               Animated.timing(controllerTranslateY, {
                  toValue: 0,
                  duration: 300,
                  easing: Easing.in(Easing.ease),
                  useNativeDriver: true
               }).start();
            }
         }
      })
   ).current;

   // TODO: add seek functionality to the controller progress bar

   useEffect(() => {
      (async () => {
         let state;

         try {
            state = await getCurrentState();
         } catch {
            notify('sorry, something unexpected happened..', 'error');
         }

         if (state.currentTrack) {
            setTrack(state.currentTrack);
            setRender(true);
         }
      })();
   }, [playback]);

   useEffect(() => {
      if (controlMenuVisible) {
         autoCloseTimer.current = setTimeout(() => {
            handleCloseMenu();
         }, 4000);
      }

      return () => clearTimeout(autoCloseTimer.current);
   }, [controlMenuVisible]);

   const handlePlayPause = async () => {
      trigger('impactLight');
      if (playback.state === State.Playing) {
         try {
            await pause();
         } catch {
            notify('wow.. pausing the track failed...', 'error');
         }
      } else if (playback.state === State.Paused || playback.state === State.Ready) {
         if (playback.state === State.Ended || parseInt(position) >= parseInt(duration) || (parseInt(position) / parseInt(duration)) * 100 === 100) {
            try {
               await restart();
            } catch {
               notify("couldn't restart the track.. 😅", 'error');
            }
         }

         try {
            await resume();
         } catch {
            notify("oof, couldn't resume the track..", 'error');
         }
      }
   };

   const handleLongPress = () => {
      if (isControlMenuAnimating.current || controlMenuVisible) return;

      trigger('impactMedium');
      setControlMenuVisible(true);
      isControlMenuAnimating.current = true;

      Animated.timing(controlMenuTranslateY, {
         toValue: -50,
         duration: 300,
         easing: Easing.in(Easing.ease),
         useNativeDriver: true
      }).start(() => {
         isControlMenuAnimating.current = false;
      });

      clearTimeout(autoCloseTimer.current);
      autoCloseTimer.current = setTimeout(() => {
         handleCloseMenu();
      }, 4000);
   };

   const handleCloseMenu = () => {
      if (isControlMenuAnimating.current || !controlMenuVisible) return;

      isControlMenuAnimating.current = true;

      Animated.timing(controlMenuTranslateY, {
         toValue: 0,
         duration: 300,
         easing: Easing.in(Easing.ease),
         useNativeDriver: true
      }).start(() => {
         setControlMenuVisible(false);
         isControlMenuAnimating.current = false;
      });
   };

   const handleToggleLoop = async () => {
      trigger('impactLight');
      const newMode = isLooping ? RepeatMode.Off : RepeatMode.Track;

      try {
         await setLoopMode(newMode);
         setIsLooping(!isLooping);
      } catch {
         notify("Couldn't toogle loop mode sorry..", 'error');
      }
   };

   const handleSkipNext = async () => {
      trigger('impactLight');
      try {
         await skipToNext();
      } catch {
         notify('failed to skip, sorry..', 'error');
      }
   };

   const handleSkipPrevious = async () => {
      trigger('impactLight');
      try {
         await skipToPrevious();
      } catch {
         notify('failed to skip to previous, mb !', 'error');
      }
   };

   const handleSinglePress = async () => {
      if (controllerVisible) return;

      trigger('impactLight');
      setControllerVisible(true);

      Animated.timing(controllerTranslateY, {
         toValue: 0,
         duration: 250,
         easing: Easing.in(Easing.ease),
         useNativeDriver: true
      }).start();
   };

   if (!render) return null;

   const percentage = duration > 0 ? (parseInt(position) / parseInt(duration)) * 100 : 0;
   const isStoppedOrLoading = [State.Stopped, State.None, State.Loading].includes(playback.state);

   return (
      <>
         <Pressable className={`${controlMenuVisible ? 'bg-palette-90' : 'bg-transparent'} w-[90%] z-50 absolute bottom-[85px] self-center rounded-[17px] overflow-hidden`} onLongPress={handleLongPress} onPress={handleSinglePress}>
            <BlurView tint="systemMaterialDark" intensity={50}>
               <View className="flex flex-col items-center w-full pb-0.5">
                  <View className="w-full px-6 my-0.5">
                     <View className="w-full bg-palette-60 h-[2px] rounded-full overflow-hidden">
                        <View style={{ width: `${percentage}%` }} className="bg-palette-30 h-full" />
                     </View>
                  </View>

                  <View className="flex flex-row items-center h-[32px] w-full">
                     <Pressable onPress={handlePlayPause} className="justify-center items-center h-full w-12 pl-4 pb-1 rounded-full">
                        {isStoppedOrLoading ? <SpinningLoader /> : <Image source={playback.state === State.Playing ? ControlIcons.pauseIcon : ControlIcons.playIcon} resizeMode="contain" className="h-3.5 w-3.5" />}
                     </Pressable>

                     <View className="flex-1 overflow-hidden flex-col">
                        <Text className="text-palette-40 font-spacemono-bold text-xs px-2 w-full leading-tight" numberOfLines={1} ellipsizeMode="tail">
                           {isStoppedOrLoading ? ':3' : track.title}
                        </Text>
                        <Text className="text-palette-40 font-spacemono text-xs px-2 w-full leading-tight" numberOfLines={1} ellipsizeMode="tail">
                           {isStoppedOrLoading ? 'loading...' : track.artist}
                        </Text>
                     </View>

                     <View className="flex overflow-hidden flex-col pr-5">
                        {isStoppedOrLoading ? (
                           <Text className="text-palette-60 font-spacemono text-xs w-full leading-tight text-start" numberOfLines={1} ellipsizeMode="tail">
                              <Text className="font-spacemono-bold">[</Text>
                              stats
                              <Text className="font-spacemono-bold">]</Text>
                           </Text>
                        ) : (
                           <Text className="text-palette-60 font-spacemono text-xs w-full leading-tight text-start" numberOfLines={1} ellipsizeMode="tail">
                              <Text className="font-spacemono-bold">[</Text>
                              {`${formatSeconds(parseInt(position))}`}
                              <Text className="font-spacemono-bold">{` / `}</Text>
                              {`${formatSeconds(parseInt(duration))}`}
                              <Text className="font-spacemono-bold">]</Text>
                           </Text>
                        )}

                        {!isStoppedOrLoading && (
                           <Text className="text-palette-60 font-spacemono text-xs w-full leading-tight text-center" numberOfLines={1} ellipsizeMode="tail">
                              <Text className="font-spacemono-bold">pct: [</Text>
                              {`${parseInt(percentage)}%`}
                              <Text className="font-spacemono-bold">]</Text>
                           </Text>
                        )}
                     </View>
                  </View>
               </View>
            </BlurView>
         </Pressable>

         {controlMenuVisible && (
            <Animated.View style={{ transform: [{ translateY: controlMenuTranslateY }] }} className="absolute z-40 h-[32px] w-[40%] bottom-[85px] self-center rounded-[17px] overflow-hidden bg-palette-80">
               <View className="flex-row items-center justify-center w-full h-full">
                  <Pressable onPress={handleSkipPrevious} className="items-center justify-center p-2.5">
                     <Image source={ControlIcons.previousIcon} resizeMode="contain" className="h-4 w-4" />
                  </Pressable>

                  <Pressable onPress={handleToggleLoop} className="items-center justify-center mx-4 p-2.5">
                     <Image source={isLooping ? ControlIcons.loopIconActive : ControlIcons.loopIcon} resizeMode="contain" className="h-4 w-4" />
                  </Pressable>

                  <Pressable onPress={handleSkipNext} className="items-center justify-center p-2.5">
                     <Image source={ControlIcons.nextIcon} resizeMode="contain" className="h-4 w-4" />
                  </Pressable>
               </View>
            </Animated.View>
         )}

         {controllerVisible && (
            <>
               <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', zIndex: 59 }} />
               <Animated.View
                  style={{ transform: [{ translateY: controllerTranslateY }], paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }}
                  className="absolute z-[60] bg-palette-80 self-center w-full bottom-0 h-[100%] rounded-t-2xl overflow-hidden"
                  {...controllerPanResponder.panHandlers}
               >
                  <View className="items-center">
                     <Image source={ControlIcons.handleIcon} resizeMode="contain" className="h-4 w-9" />
                  </View>

                  <View className="items-center my-20">
                     <Image source={track.artwork ? { uri: track.artwork } : require('../../assets/images/extras/unknown.png')} className="w-96 h-96 rounded-xl" />
                  </View>

                  <View className="flex-row mb-5 justify-between pr-6">
                     <View className="overflow-hidden flex-col px-5">
                        <Text className="text-palette-40 font-spacemono-bold text-sm px-2 w-full leading-tight" numberOfLines={1} ellipsizeMode="tail">
                           {isStoppedOrLoading ? ':3' : track.title}
                        </Text>
                        <Text className="text-palette-40 font-spacemono text-sm px-2 w-full leading-tight" numberOfLines={1} ellipsizeMode="tail">
                           {isStoppedOrLoading ? 'loading...' : track.artist}
                        </Text>
                     </View>

                     <Pressable onPress={handleToggleLoop} className="items-center justify-center p-2 self-center">
                        <Image source={isLooping ? ControlIcons.loopIconActive : ControlIcons.loopIcon} resizeMode="contain" className="h-5 w-5" />
                     </Pressable>
                  </View>

                  <View className="w-full px-7 mb-10">
                     <View className="w-full bg-palette-60 h-1 rounded-full overflow-hidden mb-2">
                        <View style={{ width: `${percentage}%` }} className="bg-palette-30 h-full" />
                     </View>

                     {isStoppedOrLoading ? (
                        <Text className="text-palette-40 font-spacemono text-xs w-full leading-tight text-start" numberOfLines={1} ellipsizeMode="tail">
                           <Text className="font-spacemono-bold">[</Text>
                           stats
                           <Text className="font-spacemono-bold">]</Text>
                        </Text>
                     ) : (
                        <Text className="text-palette-40 font-spacemono text-xs w-full leading-tight text-start" numberOfLines={1} ellipsizeMode="tail">
                           {`${formatSeconds(parseInt(position))}`}
                           <Text className="font-spacemono-bold">{` / `}</Text>
                           {`${formatSeconds(parseInt(duration))}`}
                        </Text>
                     )}
                  </View>

                  <View className="flex-row items-center justify-evenly">
                     <Pressable onPress={handleSkipPrevious} className="items-center justify-center p-2">
                        <Image source={ControlIcons.previousIcon} resizeMode="contain" className="h-10 w-10" />
                     </Pressable>

                     <Pressable onPress={handlePlayPause} className="items-center justify-center p-2">
                        <Image source={playback.state === State.Playing ? ControlIcons.pauseIcon : ControlIcons.playIcon} resizeMode="contain" className="w-9 h-9" />
                     </Pressable>

                     <Pressable onPress={handleSkipNext} className="items-center justify-center p-2">
                        <Image source={ControlIcons.nextIcon} resizeMode="contain" className="h-10 w-10" />
                     </Pressable>
                  </View>
               </Animated.View>
            </>
         )}
      </>
   );
};

export default ControlBar;

import { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, Animated, Easing } from 'react-native';
import { usePlaybackState, useProgress, State, RepeatMode } from 'react-native-track-player';
import { ControlIcons } from '../../assets/images/icons';
import { BlurView } from 'expo-blur';
import { trigger } from 'react-native-haptic-feedback';
import SpinningLoader from './loaders/SpinningLoader';
import usePlayer from '../hooks/usePlayer';
import useContext from '../hooks/useContext';
import formatSeconds from '../utils/formatSeconds';

const ControlBar = () => {
   const { notify } = useContext();
   const playback = usePlaybackState();
   const { restart, pause, resume, setLoopMode, skipToNext, skipToPrevious, getCurrentState } = usePlayer();
   const { position, duration } = useProgress(10);
   const [track, setTrack] = useState({});
   const [render, setRender] = useState(false);

   const [menuVisible, setMenuVisible] = useState(false);
   const menuTranslateY = useRef(new Animated.Value(0)).current;
   const isMenuAnimating = useRef(false);
   const autoCloseTimer = useRef(null);
   const [isLooping, setIsLooping] = useState(false);

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
      if (menuVisible) {
         autoCloseTimer.current = setTimeout(() => {
            handleCloseMenu();
         }, 4000);
      }

      return () => clearTimeout(autoCloseTimer.current);
   }, [menuVisible]);

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
      if (isMenuAnimating.current || menuVisible) return;

      trigger('impactMedium');
      setMenuVisible(true);
      isMenuAnimating.current = true;

      Animated.timing(menuTranslateY, {
         toValue: -50,
         duration: 300,
         easing: Easing.in(Easing.ease),
         useNativeDriver: true
      }).start(() => {
         isMenuAnimating.current = false;
      });

      clearTimeout(autoCloseTimer.current);
      autoCloseTimer.current = setTimeout(() => {
         handleCloseMenu();
      }, 4000);
   };

   const handleCloseMenu = () => {
      if (isMenuAnimating.current || !menuVisible) return;

      isMenuAnimating.current = true;

      Animated.timing(menuTranslateY, {
         toValue: 0,
         duration: 300,
         easing: Easing.in(Easing.ease),
         useNativeDriver: true
      }).start(() => {
         setMenuVisible(false);
         isMenuAnimating.current = false;
      });
   };

   const handleToggleLoop = async () => {
      const newMode = isLooping ? RepeatMode.Off : RepeatMode.Track;

      try {
         await setLoopMode(newMode);
         setIsLooping(!isLooping);
      } catch {
         notify("Couldn't toogle loop mode sorry..", 'error');
      }
   };

   const handleSkipNext = async () => {
      try {
         await skipToNext();
      } catch {
         notify('failed to skip, sorry..', 'error');
      }
   };

   const handleSkipPrevious = async () => {
      try {
         await skipToPrevious();
      } catch {
         notify('failed to skip to previous, mb !', 'error');
      }
   };

   if (!render) return null;

   const percentage = duration > 0 ? (parseInt(position) / parseInt(duration)) * 100 : 0;
   const isStoppedOrLoading = [State.Stopped, State.None, State.Loading].includes(playback.state);

   return (
      <>
         <Pressable className={`${menuVisible ? 'bg-palette-90' : 'bg-transparent'} w-[90%] z-50 absolute bottom-[85px] self-center rounded-[17px] overflow-hidden`} onLongPress={handleLongPress}>
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

         {menuVisible && (
            <Animated.View style={{ transform: [{ translateY: menuTranslateY }] }} className="absolute z-40 h-[32px] w-[40%] bottom-[85px] self-center rounded-[17px] overflow-hidden bg-palette-80">
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
      </>
   );
};

export default ControlBar;

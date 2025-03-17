import { useEffect, useState } from 'react';
import { Pressable, View, Image } from 'react-native';
import { ControlIcons } from '../../assets/images/icons';
import { RepeatMode, useIsPlaying } from 'react-native-track-player';
import usePlayerHandlers from '../hooks/usePlayerHandlers';
import usePlayer from '../hooks/usePlayer';
import useNotification from '../hooks/useNotification';

const PlayerControls = ({ className = '' }) => {
   const { handleSkipPrevious, handlePlayPause, handleSkipNext } = usePlayerHandlers();
   const { playing } = useIsPlaying();

   return (
      <View className={`flex-row items-center justify-evenly ${className}`}>
         <Pressable onPress={handleSkipPrevious} className="items-center justify-center p-2">
            <Image source={ControlIcons.previousIcon} resizeMode="contain" className="h-10 w-10" />
         </Pressable>

         <Pressable onPress={handlePlayPause} className="items-center justify-center p-2">
            <Image source={playing ? ControlIcons.pauseIcon : ControlIcons.playIcon} resizeMode="contain" className="w-9 h-9" />
         </Pressable>

         <Pressable onPress={handleSkipNext} className="items-center justify-center p-2">
            <Image source={ControlIcons.nextIcon} resizeMode="contain" className="h-10 w-10" />
         </Pressable>
      </View>
   );
};

export default PlayerControls;

export const ToggleLoopButton = () => {
   const { handleToggleLoop } = usePlayerHandlers();
   const { getLoopMode } = usePlayer();
   const { notify, notificationTypes } = useNotification();
   const [loopMode, setLoopMode] = useState(RepeatMode.Off);

   useEffect(() => {
      (async () => {
         try {
            const mode = await getLoopMode();
            setLoopMode(mode);
         } catch (error) {
            notify('something went wrong.', notificationTypes.error);
         }
      })();
   }, []);

   const toggleLoop = async () => {
      await handleToggleLoop();

      try {
         const newLoopMode = await getLoopMode();
         setLoopMode(newLoopMode);
      } catch {
         notify('failed to update ui...', notificationTypes.error);
      }
   };

   return (
      <Pressable onPress={toggleLoop} className="items-center justify-center p-2 self-center">
         <Image source={loopMode !== RepeatMode.Off ? ControlIcons.loopIconActive : ControlIcons.loopIcon} resizeMode="contain" className="h-5 w-5" />
      </Pressable>
   );
};

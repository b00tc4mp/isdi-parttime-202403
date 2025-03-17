import { useState, useEffect } from 'react';
import { Pressable, Image } from 'react-native';
import { RepeatMode } from 'react-native-track-player';
import useNotification from '../../hooks/useNotification';
import usePlayer from '../../hooks/usePlayer';
import usePlayerHandlers from '../../hooks/usePlayerHandlers';
import { ControlIcons } from '../../../assets/images/icons';

const FloatingPlayerControllerToggleLoopButton = () => {
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
      <Pressable onPress={toggleLoop} className="items-center justify-center mx-4 p-2.5">
         <Image source={loopMode !== RepeatMode.Off ? ControlIcons.loopIconActive : ControlIcons.loopIcon} resizeMode="contain" className="h-4 w-4" />
      </Pressable>
   );
};

export default FloatingPlayerControllerToggleLoopButton;

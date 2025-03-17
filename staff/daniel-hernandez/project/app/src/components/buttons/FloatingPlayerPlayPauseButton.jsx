import { Pressable, Image } from 'react-native';
import { useIsPlaying } from 'react-native-track-player';
import usePlayerHandlers from '../../hooks/usePlayerHandlers';
import SpinningLoader from '../loaders/SpinningLoader';

import { ControlIcons } from '../../../assets/images/icons';

const FloatingPlayerPlayPauseButton = () => {
   const { playing } = useIsPlaying();
   const { handlePlayPause } = usePlayerHandlers();

   return (
      <Pressable onPress={handlePlayPause} className="justify-center items-center h-full w-12 pl-4 pb-1 rounded-full">
         {playing === undefined ? <SpinningLoader /> : <Image source={playing ? ControlIcons.pauseIcon : ControlIcons.playIcon} resizeMode="contain" className="h-3.5 w-3.5" />}
      </Pressable>
   );
};

export default FloatingPlayerPlayPauseButton;

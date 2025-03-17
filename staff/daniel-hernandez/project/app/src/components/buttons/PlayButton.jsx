import { Pressable, Image } from 'react-native';
import { ControlIcons } from '../../../assets/images/icons';

const PlayButton = ({ onPress, isPlaying = false }) => (
   <Pressable onPress={onPress} className="w-9 h-9 rounded-full justify-center items-center">
      <Image source={isPlaying ? ControlIcons.pauseIcon : ControlIcons.playIcon} resizeMode="contain" className="w-4 h-4 ml-0.5" />
   </Pressable>
);

export default PlayButton;

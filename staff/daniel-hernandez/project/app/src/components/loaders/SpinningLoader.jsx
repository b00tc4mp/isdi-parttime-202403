import { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { ControlIcons } from '../../../assets/images/icons';

const SpinningLoader = ({ className, ...propsToImage }) => {
   const spinner = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.loop(
         Animated.timing(spinner, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
            easing: Easing.linear
         })
      ).start();
   }, [spinner]);

   const spin = spinner.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
   });

   return (
      <View className={`${className} justify-center items-center self-center z-10`}>
         <Animated.Image source={ControlIcons.loadingIcon} style={{ transform: [{ rotate: spin }] }} className="h-5 w-5" {...propsToImage} />
      </View>
   );
};

export default SpinningLoader;

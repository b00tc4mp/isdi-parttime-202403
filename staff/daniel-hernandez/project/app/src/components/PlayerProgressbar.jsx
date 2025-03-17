import { useRef, useEffect } from 'react';
import { Animated, PanResponder, View } from 'react-native';
import { useProgress } from 'react-native-track-player';
import usePlayerHandlers from '../hooks/usePlayerHandlers';

const PlayerProgressbar = ({ className = '' }) => {
   const { position, duration } = useProgress(250);
   const { handleSeek } = usePlayerHandlers();

   const dragging = useRef(false);
   const animating = useRef(false);

   const barHeight = useRef(new Animated.Value(4)).current;
   const barWidth = useRef(0);
   const barX = useRef(0);

   const progress = useRef(new Animated.Value(0)).current;
   const startingProgress = useRef(0);

   const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (_, __) => {
         // Trigger the height increase if not already animating
         if (!animating.current) {
            animating.current = true;

            Animated.timing(barHeight, {
               toValue: 8,
               duration: 150,
               useNativeDriver: false
            }).start(() => {
               // Allow shrink animation after pressing
               animating.current = false;

               // Shrink back to original size if not dragging
               if (!dragging.current) {
                  Animated.timing(barHeight, {
                     toValue: 4,
                     duration: 150,
                     useNativeDriver: false
                  }).start(() => (animating.current = false));
               }
            });
         }
         return true; // Allow the pan responder to capture touches
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
         // Allow gesture to start is its a horizontal movement
         return Math.abs(gestureState.dx) > 1;
      },
      onPanResponderGrant: (_, __) => {
         dragging.current = true;

         // Trigger the height increase when dragging starts
         if (!animating.current) {
            animating.current = true;

            Animated.timing(barHeight, {
               toValue: 8,
               duration: 150,
               useNativeDriver: false
            }).start(() => (animating.current = false));
         }

         // Store the starting progress percentage
         startingProgress.current = (position / duration) * 100;
      },
      onPanResponderMove: (_, gestureState) => {
         const relativeX = gestureState.moveX - barX.current;

         // Are we within bounds of the progress bar ?
         if (relativeX >= 0 && relativeX <= barWidth.current) {
            // Calculate the proportional change in position based on the drag "dx"
            const changeInPosition = (gestureState.dx / barWidth.current) * 100 * 0.15;
            const newPercentage = startingProgress.current + changeInPosition;

            // Constrain the new percentage to be within 0 ~ 100
            const constrainedPercentage = Math.max(0, Math.min(newPercentage, 100));

            // Update animated progress bar
            progress.setValue(constrainedPercentage);

            // Update the starting progress for the next drag
            startingProgress.current = constrainedPercentage;

            // Seek to the new position when user drags
            const newPosition = (constrainedPercentage / 100) * duration;
            handleSeek(newPosition);
         }
      },
      onPanResponderRelease: (_, __) => {
         dragging.current = false;

         // Trigger the shrink animation when releasing the bar
         if (!animating.current) {
            animating.current = true;

            Animated.timing(barHeight, {
               toValue: 4,
               duration: 150,
               useNativeDriver: false
            }).start(() => (animating.current = false));
         }
      }
   });

   useEffect(() => {
      if (!dragging.current && duration > 0) {
         progress.setValue((position / duration) * 100);
      }
   }, [position, duration]);

   return (
      <View className={`h-3 justify-center mb-1 mx-7 ${className}`} {...panResponder.panHandlers}>
         <Animated.View
            className="w-full bg-palette-60 rounded-full overflow-hidden"
            style={{ height: barHeight }}
            onLayout={event => {
               const { width, x } = event.nativeEvent.layout;
               barWidth.current = width;
               barX.current = x;
            }}
         >
            <Animated.View
               style={{
                  width: progress.interpolate({
                     inputRange: [0, 100],
                     outputRange: ['0%', '100%']
                  })
               }}
               className="bg-palette-30 h-full transition-all"
            />
         </Animated.View>
      </View>
   );
};

export default PlayerProgressbar;

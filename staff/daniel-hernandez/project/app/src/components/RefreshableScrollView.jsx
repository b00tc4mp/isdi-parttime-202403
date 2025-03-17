import { useCallback, useRef, useState } from 'react';
import { Animated, ScrollView, RefreshControl, View } from 'react-native';
import { useTrackStore } from '../store/track';
import SpinningLoader from './loaders/SpinningLoader';
import { trigger } from 'react-native-haptic-feedback';

const RefreshableScrollView = ({ children, onRefresh, loading }) => {
   const currentTrackId = useTrackStore(state => state.currentTrackId);

   const [pullDistance, setPullDistance] = useState(0);
   const scaleAnim = useRef(new Animated.Value(0.5)).current;
   const threshold = 150;

   const handleScroll = useCallback(event => {
      const offsetY = event.nativeEvent.contentOffset.y;

      if (offsetY < 0) {
         const pullDist = Math.abs(offsetY);
         setPullDistance(pullDist);

         // Animate from 0 to 1 as we approach threshold
         const progress = Math.min(pullDist / threshold, 1);
         scaleAnim.setValue(progress);
      } else {
         // Reset if user scrolls back up without releasing
         setPullDistance(0);
      }
   }, []);

   const handleRelease = useCallback(() => {
      if (pullDistance >= threshold) {
         trigger('impactMedium');
         onRefresh();
         // Animate to "loading" state
         Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true
         }).start();
      } else {
         // Snap back if not reaching threshold
         Animated.spring(scaleAnim, {
            toValue: 0,
            useNativeDriver: true
         }).start(() => setPullDistance(0));
      }
   }, [pullDistance, onRefresh]);

   return (
      <View className="flex-1">
         <ScrollView
            className="top-0"
            contentContainerStyle={{
               paddingBottom: currentTrackId ? 150 : 85
            }}
            scrollEventThrottle={16}
            onScroll={handleScroll}
            onScrollEndDrag={handleRelease}
            refreshControl={<RefreshControl refreshing={false} progressViewOffset={threshold} tintColor="transparent" colors={[]} />}
         >
            {children}
         </ScrollView>

         {/* Floating loader that doesn't affect layout */}
         {pullDistance > 0 && (
            <Animated.View
               className="absolute top-8 self-center"
               style={{
                  opacity: scaleAnim.interpolate({
                     inputRange: [0, 1],
                     outputRange: [0, 1]
                  }),
                  transform: [
                     {
                        scale: scaleAnim.interpolate({
                           inputRange: [0, 1],
                           outputRange: [0.5, 1]
                        })
                     },
                     {
                        translateY: scaleAnim.interpolate({
                           inputRange: [0, 1],
                           outputRange: [-20, 0]
                        })
                     }
                  ]
               }}
            >
               <SpinningLoader tintColor="#E36526" />
            </Animated.View>
         )}
      </View>
   );
};

export default RefreshableScrollView;

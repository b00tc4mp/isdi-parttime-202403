import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { BlurView } from 'expo-blur';
import FloatingPlayerProgressbar from './FloatingPlayerProgressbar';
import FloatingPlayerPlayPauseButton from './buttons/FloatingPlayerPlayPauseButton';
import SpinningLoader from './loaders/SpinningLoader';
import FloatingPlayerController from './FloatingPlayerController';
import { EmptyTrackProgressStats, TrackInfo, TrackProgressStats } from './FloatingPlayerInfo';
import Player from './Player';

const FloatingPlayer = () => {
   const activeTrack = useActiveTrack();

   const [renderFloatingPlayer, setRenderFloatingPlayer] = useState(false);
   const [floatingPlayerControllerVisible, setFloatingPlayerControllerVisible] = useState(false);
   const [playerVisible, setPlayerVisible] = useState(false);

   if (activeTrack && !renderFloatingPlayer) setRenderFloatingPlayer(true);
   if (!renderFloatingPlayer) return null;

   return (
      <>
         <Pressable className={`${floatingPlayerControllerVisible ? 'bg-palette-90' : 'bg-transparent'} w-[90%] z-50 absolute bottom-[85px] self-center rounded-[17px] overflow-hidden`} onLongPress={() => setFloatingPlayerControllerVisible(true)} onPress={() => setPlayerVisible(true)}>
            <BlurView tint="systemMaterialDark" intensity={50}>
               <View className="flex flex-col items-center w-full pb-0.5">
                  <FloatingPlayerProgressbar />

                  <View className="flex flex-row items-center h-[32px] w-full">
                     {activeTrack ? <FloatingPlayerPlayPauseButton /> : <SpinningLoader className="justify-center items-center h-full w-12 pl-4 pb-1 rounded-full" />}

                     <TrackInfo activeTrack={activeTrack} />

                     <View className="flex overflow-hidden flex-col pr-5">{activeTrack ? <TrackProgressStats /> : <EmptyTrackProgressStats />}</View>
                  </View>
               </View>
            </BlurView>
         </Pressable>

         <FloatingPlayerController controllerTrigger={floatingPlayerControllerVisible} resetTrigger={() => setFloatingPlayerControllerVisible(false)} />

         <Player playerTrigger={playerVisible} resetTrigger={() => setPlayerVisible(false)} />
      </>
   );
};

export default FloatingPlayer;

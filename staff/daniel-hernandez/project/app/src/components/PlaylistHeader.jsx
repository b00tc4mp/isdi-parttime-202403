import { View, Image, Text } from 'react-native';
import { useIsPlaying } from 'react-native-track-player';
import usePlayerHandlers from '../hooks/usePlayerHandlers';
import { useTrackStore } from '../store/track';
import PlayButton from './buttons/PlayButton';
import FollowButton from './buttons/FollowButton';
import formatSeconds from '../utils/formatSeconds';

const PlaylistHeader = ({ item, onAdd }) => {
   const { handlePlay, handlePlayPause } = usePlayerHandlers();
   const currentPlaylistId = useTrackStore(state => state.currentPlaylistId);
   const { playing } = useIsPlaying();

   return (
      <View className="bg-palette-90 w-full my-1.5">
         <View className="bg-palette-80 mx-5 rounded-3xl p-3 flex-row">
            <View className="w-44 items-center justify-center">
               <Image source={item.coverArt ? { uri: item.coverArt } : require('../../assets/images/extras/unknown.png')} resizeMode="contain" className="rounded-2xl w-44 h-44" />
            </View>

            <View className="flex-1 items-center pl-1.5">
               <Text className="text-palette-40 font-poppins-bold text-xl mt-0.5" numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
               </Text>

               <Text className="text-palette-40 font-spacemono text-xs mt-0.5 self-center" numberOfLines={1} ellipsizeMode="tail">
                  « {`${item.tracks.length} ${item.tracks.length === 0 || item.tracks.length > 1 ? 'tracks' : 'track'}`} ~ {`${formatSeconds(item.tracks.reduce((sum, track) => sum + Number(track.duration), 0))}`} »
               </Text>

               {item.owner && (
                  <View className="flex-row w-full items-center justify-start mt-0.5">
                     <Image source={item.owner.profileImage ? { uri: item.owner.profileImage } : require('../../assets/images/extras/unknown.png')} resizeMode="contain" className="rounded-full w-4 h-4 ml-0.5" />
                     <Text className="text-palette-40 font-spacemono text-xs leading-tight ml-1.5" numberOfLines={1} ellipsizeMode="tail">
                        {item.owner.username}
                     </Text>
                     <Text className="text-palette-40 font-spacemono text-xs self-center flex-1" numberOfLines={1} ellipsizeMode="tail">
                        {` ~ ${item.followers}`} {parseInt(item.followers) === 0 || parseInt(item.followers) > 1 ? 'followers' : 'follower'}
                     </Text>
                  </View>
               )}

               <View className="h-px bg-palette-60 w-[80%] mt-2.5 mb-3 rounded-full self-center" />

               <Text className="text-palette-40 font-spacemono text-xs leading-tight self-center px-1">{item.description.length > 35 ? item.description.slice(0, 35).concat('~') : item.description}</Text>

               <View className="flex-1" />

               <View className="flex-row w-full justify-end">
                  {!item.isDynamic && (
                     <FollowButton
                        onPress={event => {
                           event.stopPropagation();
                           onAdd(item.id);
                        }}
                        isFollowed={item.isFollowed}
                        isDisabled={item?.cannotBeFollowed}
                     />
                  )}

                  <PlayButton
                     onPress={() => {
                        if (currentPlaylistId === item.id) {
                           handlePlayPause();
                        } else {
                           // Pass playlist id
                           if (item.tracks.length > 0) handlePlay(null, item.tracks, 0, item.id);
                        }
                     }}
                     isPlaying={currentPlaylistId === item.id && playing}
                  />
               </View>
            </View>
         </View>
      </View>
   );
};

export default PlaylistHeader;

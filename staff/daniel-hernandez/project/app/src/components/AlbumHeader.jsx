import { View, Image, Text } from 'react-native';
import { useIsPlaying } from 'react-native-track-player';
import usePlayerHandlers from '../hooks/usePlayerHandlers';
import { useTrackStore } from '../store/track';
import PlayButton from './buttons/PlayButton';
import formatSeconds from '../utils/formatSeconds';
import { formatDate } from '../utils/formatDate';

const AlbumHeader = ({ item }) => {
   const { handlePlay, handlePlayPause } = usePlayerHandlers();
   const { playing } = useIsPlaying();

   const currentPlaylistId = useTrackStore(state => state.currentPlaylistId);

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

               <View className="flex-row w-full items-center justify-center">
                  <Text className="text-palette-40 font-spacemono text-xs leading-tight ml-1.5" numberOfLines={1} ellipsizeMode="tail">
                     {item.artists[0].username} ~ {item.type}
                  </Text>
               </View>

               <Text className="text-palette-40 font-spacemono text-xs leading-tight self-center mt-0.5">{formatDate(item.releaseDate)}</Text>

               <View className="flex-1" />

               <View className="flex-row w-full justify-end">
                  <PlayButton
                     onPress={() => {
                        if (currentPlaylistId === item.id) {
                           handlePlayPause();
                        } else {
                           // Pass playlist id
                           handlePlay(null, item.tracks, 0, item.id);
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

export default AlbumHeader;

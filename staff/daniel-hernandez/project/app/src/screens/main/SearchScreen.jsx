import { useState, useEffect } from 'react';
import { View, Image, Text, Pressable, SectionList, FlatList, ActivityIndicator } from 'react-native';
import useContext from '../../hooks/useContext';
import SlidingTextInputWithCancel from '../../components/SlidingTextInputWithCancel';
import PillBar from '../../components/PillBar';
import services from '../../services';
import constants from 'com/constants';
import formatSeconds from '../../utils/formatSeconds';

import { TabIcons } from '../../../assets/images/icons';

const SearchScreen = () => {
   const { notify } = useContext();
   const [query, setQuery] = useState('');
   const [queryDone, setQueryDone] = useState(false);
   const [selectedPill, setSelectedPill] = useState({ label: 'All', queryType: [...constants.queryTypes], limit: 8 });
   const [results, setResults] = useState({});
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (query || query.trim()) handleSearch();
   }, [selectedPill]);

   const handleSearch = async () => {
      if (!query || !query.trim()) return;

      setQueryDone(false);
      setLoading(true);
      setResults({});

      try {
         const response = await services.search(query, selectedPill.queryType, selectedPill.limit);
         setResults({ ...response });
         setQueryDone(true);
      } catch {
         notify('Something went wrong', 'error');
      } finally {
         setLoading(false);
      }
   };

   const handlePillPress = pill => {
      if (selectedPill.label === pill.label) return;

      setLoading(true);
      setResults({});
      setSelectedPill(pill);
   };

   const handleQueryChange = text => {
      setQuery(text);
      setQueryDone(false);
   };

   const renderResult = ({ item, section }) => {
      const type = section?.key || selectedPill.label.toLowerCase();

      switch (type) {
         case 'users':
            return (
               <View key={item.id} className="mt-4 flex-row items-start w-[100%]">
                  <Image source={item.profileImage ? { uri: item.profileImage } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-full mr-3" />

                  <View className="flex-1 justify-start pt-3">
                     <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
                        {item.username}
                     </Text>

                     <Text className="text-palette-40 font-spacemono text-xs leading-tight" numberOfLines={1} ellipsizeMode="tail">{`${item.followers} ${parseInt(item.followers) === 0 || parseInt(item.followers) > 1 ? 'followers' : 'follower'}`}</Text>
                  </View>

                  <Pressable className="self-center h-5 w-5 ml-2">
                     <Image source={require('../../../assets/images/extras/add.png')} className="self-center h-4 w-4 my-auto" resizeMode="contain" />
                  </Pressable>
               </View>
            );
         case 'tracks':
            const artistsDisplay =
               item.artists.length > 2
                  ? `${item.artists
                       .slice(0, 2)
                       .map(artist => artist.username)
                       .join(', ')}...`
                  : item.artists.map(artist => artist.username).join(', ');

            return (
               <View key={item.id} className="mt-4 flex-row items-start w-[100%]">
                  <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />

                  <View className="flex-1 justify-start mx-auto">
                     <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
                        {item.name}
                     </Text>

                     <Text className="text-palette-40 font-spacemono text-sm leading-tight" numberOfLines={1} ellipsizeMode="tail">
                        {artistsDisplay}
                     </Text>
                     <Text className="text-palette-40 font-spacemono text-xs leading-snug" numberOfLines={1} ellipsizeMode="tail">{`${formatSeconds(item.duration)}`}</Text>
                  </View>

                  <Pressable className="self-center h-5 w-5 ml-2">
                     <Image source={require('../../../assets/images/extras/more.png')} className="self-center h-1 w-5 my-auto" resizeMode="contain" />
                  </Pressable>
               </View>
            );
         case 'playlists':
            return (
               <View key={item.id} className="mt-4 flex-row items-start w-[100%]">
                  <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />

                  <View className="flex-1 justify-start mx-auto">
                     <Text className="text-palette-40 font-spacemono-bold text-sm" numberOfLines={1} ellipsizeMode="tail">
                        {item.name}
                     </Text>
                     <Text className="text-palette-40 font-spacemono text-sm leading-tight" numberOfLines={1} ellipsizeMode="tail">{`by ${item.owner.username}`}</Text>
                     <Text className="text-palette-40 font-spacemono text-xs leading-snug">{`${item.tracks} ${parseInt(item.tracks) === 0 || parseInt(item.tracks) > 1 ? 'tracks' : 'track'} ~ ${formatSeconds(item.duration)}`}</Text>
                  </View>

                  <Pressable className="self-center h-5 w-5 ml-2">
                     <Image source={require('../../../assets/images/extras/more.png')} className="self-center h-1 w-5 my-auto" resizeMode="contain" />
                  </Pressable>
               </View>
            );

         case 'albums':
            return (
               <View key={item.id} className="mt-4 flex-row items-start w-[100%]">
                  <Image source={item.coverArt ? { uri: item.coverArt } : require('../../../assets/images/extras/unknown.png')} className="w-16 h-16 rounded-sm mr-3" />

                  <View className="flex-1 justify-start mx-auto">
                     <Text className="text-palette-40 font-spacemono-bold text-sm leading-tight" numberOfLines={1} ellipsizeMode="tail">
                        {item.name}
                     </Text>

                     <Text className="text-palette-40 font-spacemono text-xs leading-snug" numberOfLines={1} ellipsizeMode="tail">
                        by {item.artists[0].username}
                     </Text>
                  </View>

                  <Pressable className="self-center h-5 w-5 ml-2">
                     <Image source={require('../../../assets/images/extras/more.png')} className="self-center h-1 w-5 my-auto" resizeMode="contain" />
                  </Pressable>
               </View>
            );
         default:
            return null;
      }
   };

   return (
      <View className="flex-1 bg-palette-90">
         <View className="top-0 items-center">
            <SlidingTextInputWithCancel
               value={query}
               onChangeText={handleQueryChange}
               placeholder="Search"
               returnKeyType="search"
               iconLeft={<Image source={TabIcons.glassIconActive} resizeMode="contain" className="w-6 h-5" />}
               onSubmitEditing={handleSearch}
               onClearPress={() => {
                  setQuery('');
                  setResults({});
                  setQueryDone(false);
               }}
               onFocus={() => {
                  setResults({});
                  setQueryDone(false);
               }}
               onCancelPress={() => {
                  setQuery('');
                  setResults({});
                  setQueryDone(false);
               }}
            />

            {loading && <ActivityIndicator size="small" color="#E36526" className="mt-3" />}

            {queryDone && query && (
               <PillBar
                  pills={[
                     { label: 'All', onPress: handlePillPress, queryType: [...constants.queryTypes], limit: constants.DEFAULT_LIMIT },
                     { label: 'Users', onPress: handlePillPress, queryType: ['user'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Tracks', onPress: handlePillPress, queryType: ['track'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Playlists', onPress: handlePillPress, queryType: ['playlist'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Album', onPress: handlePillPress, queryType: ['album'], limit: constants.DEFAULT_LIMIT }
                  ]}
                  selectedPill={selectedPill.label}
                  className="mt-3"
               />
            )}

            {!loading &&
               query &&
               queryDone &&
               (selectedPill.label === 'All' ? (
                  results.users.length === 0 && results.tracks.length === 0 && results.playlists.length === 0 && results.albums.length > 0 ? (
                     <View className="w-[90%] bg-palette-80 items-center mt-4 p-4 pt-3 rounded-lg">
                        <Text className="font-poppins-semibold text-palette-40 text-base">Woah... 😳</Text>
                        <Text className="font-poppins text-palette-40 text-sm">Couldn't find anything for '{query}'. Maybe try something else ?</Text>
                     </View>
                  ) : (
                     <SectionList
                        sections={[
                           { key: 'users', data: results?.users ?? [] },
                           { key: 'tracks', data: results?.tracks ?? [] },
                           { key: 'playlists', data: results?.playlists ?? [] },
                           { key: 'albums', data: results?.albums ?? [] }
                        ]}
                        keyExtractor={item => item.id}
                        renderItem={renderResult}
                        renderSectionHeader={({ section }) =>
                           section.data.length > 0 ? (
                              <View className="w-[90%] items-start">
                                 <Text className="font-poppins-semibold text-palette-40 mt-4">{section.key.charAt(0).toUpperCase() + section.key.slice(1)}</Text>
                              </View>
                           ) : null
                        }
                        showsVerticalScrollIndicator={false}
                        stickySectionHeadersEnabled={false}
                        contentContainerStyle={{ paddingBottom: 160 }}
                        className="w-[90%]"
                     />
                  )
               ) : results[selectedPill.label.toLowerCase()]?.length === 0 ? (
                  <View className="w-[90%] bg-palette-80 items-center mt-4 p-4 pt-3 rounded-lg">
                     <Text className="font-poppins-semibold text-palette-40 text-base">Woah... 😳</Text>
                     <Text className="font-poppins text-palette-40 text-sm">Couldn't find anything for '{query}'. Maybe try something else ?</Text>
                  </View>
               ) : (
                  <FlatList data={results[selectedPill.label.toLowerCase()] || []} keyExtractor={item => item.id} renderItem={renderResult} contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false} className="w-[90%]" />
               ))}
         </View>
      </View>
   );
};

export default SearchScreen;

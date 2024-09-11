import { useState, useEffect, useCallback } from 'react';
import { View, Image, Text, SectionList, FlatList, ActivityIndicator } from 'react-native';
import useContext from '../../hooks/useContext';
import { UserItem, TrackItem, PlaylistItem, AlbumItem } from '../../components/items';
import SlidingTextInputWithCancel from '../../components/SlidingTextInputWithCancel';
import PillBar from '../../components/PillBar';
import services from '../../services';
import constants from 'com/constants';

import { TabIcons } from '../../../assets/images/icons';

const DEFAULT_PILL = { label: 'All', queryType: [...constants.queryTypes], limit: 8 };

const SearchScreen = () => {
   const { notify } = useContext();
   const [query, setQuery] = useState('');
   const [status, setStatus] = useState({ loading: false, queryDone: false });
   const [selectedPill, setSelectedPill] = useState(DEFAULT_PILL);
   const [results, setResults] = useState({});
   const [shouldSearch, setShouldSearch] = useState(false);

   useEffect(() => {
      if (shouldSearch && query.trim()) {
         handleSearch();
         setShouldSearch(false);
      }
   }, [selectedPill, shouldSearch]);

   const resetSearch = useCallback(resetQuery => {
      if (resetQuery) setQuery('');
      setSelectedPill(DEFAULT_PILL);
      setResults({});
      setStatus({ loading: false, queryDone: false });
      setShouldSearch(false);
   }, []);

   const handleSearch = useCallback(async () => {
      if (!query.trim()) return;

      setStatus({ loading: true, queryDone: false });
      setResults({});

      try {
         const response = await services.search(query, selectedPill.queryType, selectedPill.limit);
         console.log(response);
         setResults(response);
         setStatus({ loading: false, queryDone: true });
      } catch {
         notify('Something went wrong. Try again ?', 'error');
         setStatus({ loading: false, queryDone: false });
      }
   }, [query, selectedPill, notify]);

   const handlePillPress = pill => {
      if (selectedPill.label === pill.label) return;

      setStatus(s => ({ ...s, loading: true }));
      setSelectedPill(pill);
      setResults({});
      setShouldSearch(true);
   };

   const handleQueryChange = text => {
      setStatus(s => ({ ...s, queryDone: false }));
      setQuery(text);
   };

   const renderResult = useCallback(
      ({ item, section }) => {
         const type = section?.key || selectedPill.label.toLowerCase();

         switch (type) {
            case 'users':
               return <UserItem item={item} />;
            case 'tracks':
               return <TrackItem item={item} />;
            case 'playlists':
               return <PlaylistItem item={item} />;
            case 'albums':
               return <AlbumItem item={item} />;
            default:
               return null;
         }
      },
      [selectedPill]
   );

   const renderEmptyResults = () => (
      <View className="w-[90%] bg-palette-80 items-center mt-4 p-4 pt-3 rounded-lg">
         <Text className="font-poppins-semibold text-palette-40 text-base">Woah... 😳</Text>
         <Text className="font-poppins text-palette-40 text-sm">
            Couldn't find anything for <Text className="font-poppins-bold">'{query.length > 20 ? query.slice(0, 20).concat('~') : query}'</Text>. Maybe try something else ?
         </Text>
      </View>
   );

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
               onClearPress={() => resetSearch(true)}
               onFocus={() => resetSearch(false)}
               onCancelPress={() => resetSearch(true)}
            />

            {status.queryDone && query && (
               <PillBar
                  pills={[
                     { label: 'All', onPress: handlePillPress, queryType: [...constants.queryTypes], limit: constants.DEFAULT_LIMIT },
                     { label: 'Users', onPress: handlePillPress, queryType: ['user'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Tracks', onPress: handlePillPress, queryType: ['track'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Playlists', onPress: handlePillPress, queryType: ['playlist'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Album', onPress: handlePillPress, queryType: ['album'], limit: constants.DEFAULT_LIMIT }
                  ]}
                  selectedPill={selectedPill.label}
                  className="my-3"
               />
            )}

            {!status.loading &&
               query &&
               status.queryDone &&
               (selectedPill.label === 'All' ? (
                  results.users.length === 0 && results.tracks.length === 0 && results.playlists.length === 0 && results.albums.length === 0 ? (
                     renderEmptyResults()
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
                  renderEmptyResults()
               ) : (
                  <FlatList data={results[selectedPill.label.toLowerCase()] || []} keyExtractor={item => item.id} renderItem={renderResult} contentContainerStyle={{ paddingBottom: 160 }} showsVerticalScrollIndicator={false} className="w-[90%]" />
               ))}
         </View>

         {status.loading && <ActivityIndicator size="small" color="#E36526" className="m-auto" />}
      </View>
   );
};

export default SearchScreen;

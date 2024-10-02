import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Image, Text, SectionList, FlatList } from 'react-native';
import useNotification from '../../hooks/useNotification';
import usePlayer from '../../hooks/usePlayer';
import { UserItem, TrackItem, PlaylistItem, AlbumItem } from '../../components/items';
import SpinningLoader from '../../components/loaders/SpinningLoader';
import SlidingTextInputWithCancel from '../../components/SlidingTextInputWithCancel';
import PillBar from '../../components/PillBar';
import services from '../../services';
import constants from 'com/constants';

import { TabIcons } from '../../../assets/images/icons';

const DEFAULT_PILL = { label: 'All', queryType: [...constants.queryTypes], limit: 8 };

// TODO: refactor and componentize
const SearchScreen = () => {
   const { notify, notificationTypes } = useNotification();
   const { play } = usePlayer();
   const [query, setQuery] = useState('');
   const [status, setStatus] = useState({ loading: false, queryDone: false });
   const [selectedPill, setSelectedPill] = useState(DEFAULT_PILL);
   const [results, setResults] = useState({});
   const [shouldSearch, setShouldSearch] = useState(false);

   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [isFetchingMore, setIsFetchingMore] = useState(false);

   useEffect(() => {
      if (shouldSearch && query.trim()) {
         handleSearch();
         setShouldSearch(false);
      }
   }, [selectedPill, shouldSearch]);

   const resetSearch = (resetQuery = false) => {
      if (resetQuery) setQuery('');
      setSelectedPill(DEFAULT_PILL);
      setResults({});
      setStatus({ loading: false, queryDone: false });
      setShouldSearch(false);

      setPage(1);
      setHasMore(true);
   };

   const handleSearch = async (pageNum = 1) => {
      if (!query.trim()) return;

      if (pageNum === 1) {
         setStatus({ loading: true, queryDone: false });
         setResults({});
      }

      try {
         const response = await services.search(query, selectedPill.queryType, selectedPill.limit, pageNum);
         if (selectedPill.label !== 'All') {
            setResults(oldResults => ({
               ...oldResults,
               [selectedPill.label.toLowerCase()]: [...(oldResults[selectedPill.label.toLowerCase()] || []), ...response[selectedPill.label.toLowerCase()]]
            }));
         } else {
            setResults(response);
         }

         setStatus({ loading: false, queryDone: true });
         setPage(pageNum);

         if (selectedPill.label !== 'All') {
            if (response[selectedPill.label.toLowerCase()]?.length < selectedPill.limit) {
               setHasMore(false);
            }
         }
      } catch {
         notify('Something went wrong. Try again ?', notificationTypes.error);
         setStatus({ loading: false, queryDone: false });
      }
   };

   const handlePillPress = pill => {
      if (selectedPill.label === pill.label) return;

      setStatus(s => ({ ...s, loading: true }));
      setSelectedPill(pill);
      setResults({});
      setShouldSearch(true);

      setPage(1);
      setHasMore(true);
   };

   const handleQueryChange = text => {
      setStatus(s => ({ ...s, queryDone: false }));
      setQuery(text);
   };

   const handleLoadMore = () => {
      if (hasMore && !isFetchingMore && !status.loading) {
         setIsFetchingMore(true);
         handleSearch(page + 1).finally(() => setIsFetchingMore(false));
      }
   };

   const [currentTrackId, setCurrentTrackId] = useState(null);
   const abortController = useRef(0);
   const handleTrackPress = async track => {
      if (currentTrackId !== track.id) setCurrentTrackId(track.id);
      if (abortController.current) abortController.current.abort();

      abortController.current = new AbortController();

      try {
         await play(track, null, { signal: abortController.current.signal });
      } catch (e) {
         if (e.message === 'AbortError') return;
         notify('oopsie-daisy! something went wrong..', notificationTypes.error);
      }
   };

   const renderResult = useCallback(
      ({ item, section }) => {
         const type = section?.key || selectedPill.label.toLowerCase();

         switch (type) {
            case 'users':
               return <UserItem item={item} onAdd={() => {}} onGeneralPress={() => {}} />;
            case 'tracks':
               const isPlaying = currentTrackId === item.id;
               return <TrackItem item={item} onMore={() => {}} onGeneralPress={handleTrackPress} isPlaying={isPlaying} />;
            case 'playlists':
               return <PlaylistItem item={item} onMore={() => {}} onGeneralPress={() => {}} />;
            case 'albums':
               return <AlbumItem item={item} onMore={() => {}} onGeneralPress={() => {}} />;
            default:
               return null;
         }
      },
      [selectedPill, currentTrackId]
   );

   const renderEmptyResults = useCallback(() => {
      return (
         <View className="w-[90%] bg-palette-80 items-center mt-4 p-4 pt-3 rounded-lg">
            <Text className="font-poppins-semibold text-palette-40 text-base">Woah... 😳</Text>
            <Text className="font-poppins text-palette-40 text-sm">
               Couldn't find anything for <Text className="font-poppins-bold">'{query.length > 20 ? query.slice(0, 20).concat('~') : query}'</Text>. Maybe try something else ?
            </Text>
         </View>
      );
   }, [query]);

   const renderSectionHeader = useCallback(({ section }) => {
      const pillMap = {
         users: { label: 'Users', onPress: handlePillPress, queryType: ['user'], limit: constants.DEFAULT_LIMIT },
         tracks: { label: 'Tracks', onPress: handlePillPress, queryType: ['track'], limit: constants.DEFAULT_LIMIT },
         playlists: { label: 'Playlists', onPress: handlePillPress, queryType: ['playlist'], limit: constants.DEFAULT_LIMIT },
         albums: { label: 'Albums', onPress: handlePillPress, queryType: ['album'], limit: constants.DEFAULT_LIMIT }
      };

      return section.data.length > 0 ? (
         <View className="w-[100%] justify-between items-center mt-3 flex-row px-5 mb-1.5">
            <Text className="font-poppins-semibold text-xl text-palette-40">{section.key.charAt(0).toUpperCase() + section.key.slice(1)}</Text>

            <Text className="font-poppins text-extras-40 text-xs underline" onPress={() => handlePillPress(pillMap[section.key])}>
               See all
            </Text>
         </View>
      ) : null;
   }, []);

   const renderSectionList = () => (
      <SectionList
         sections={[
            { key: 'users', data: results?.users ?? [] },
            { key: 'tracks', data: results?.tracks ?? [] },
            { key: 'playlists', data: results?.playlists ?? [] },
            { key: 'albums', data: results?.albums ?? [] }
         ]}
         keyExtractor={item => item.id}
         renderItem={renderResult}
         renderSectionHeader={renderSectionHeader}
         showsVerticalScrollIndicator={false}
         stickySectionHeadersEnabled={false}
         contentContainerStyle={{ paddingBottom: currentTrackId ? 210 : 160 }}
         className="w-[100%]"
      />
   );

   const renderFlatList = () => (
      <FlatList
         data={results[selectedPill.label.toLowerCase()] || []}
         keyExtractor={item => item.id}
         renderItem={renderResult}
         contentContainerStyle={{ paddingBottom: currentTrackId ? 210 : 160 }}
         showsVerticalScrollIndicator={false}
         className="w-[100%]"
         onEndReached={handleLoadMore}
         onEndReachedThreshold={0.5}
         ListFooterComponent={isFetchingMore ? <SpinningLoader tintColor="#E36526" /> : null}
      />
   );

   const renderResults = () => {
      if (!status.loading && query && status.queryDone) {
         if (selectedPill.label === 'All') {
            return results.users.length === 0 && results.tracks.length === 0 && results.playlists.length === 0 && results.albums.length === 0 ? renderEmptyResults() : renderSectionList();
         }
         return results[selectedPill.label.toLowerCase()].length === 0 ? renderEmptyResults() : renderFlatList();
      }
      return null;
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
               onSubmitEditing={() => handleSearch()}
               onClearPress={() => resetSearch(true)}
               onFocus={resetSearch}
               onCancelPress={() => resetSearch(true)}
            />

            {status.queryDone && query && !status.loading && (
               <PillBar
                  pills={[
                     { label: 'All', onPress: handlePillPress, queryType: [...constants.queryTypes], limit: 8 },
                     { label: 'Users', onPress: handlePillPress, queryType: ['user'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Tracks', onPress: handlePillPress, queryType: ['track'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Playlists', onPress: handlePillPress, queryType: ['playlist'], limit: constants.DEFAULT_LIMIT },
                     { label: 'Albums', onPress: handlePillPress, queryType: ['album'], limit: constants.DEFAULT_LIMIT }
                  ]}
                  selectedPill={selectedPill.label}
                  className="my-3"
               />
            )}

            {renderResults()}
         </View>

         {status.loading && (
            <View className="flex-1 justify-center items-center">
               <SpinningLoader tintColor="#E36526" />
            </View>
         )}

         {!status.queryDone && !status.loading && (
            <View className="flex-1 items-center">
               {'何かを検索します。'.split('').map((char, index) => (
                  <Text key={index} className="font-rounded-mplus-1c-medium text-palette-40 text-[20px] leading-[24px] top-44">
                     {char}
                  </Text>
               ))}
            </View>
         )}
      </View>
   );
};

export default SearchScreen;

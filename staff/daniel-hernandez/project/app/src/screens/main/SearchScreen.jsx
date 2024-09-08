import { useState } from 'react';
import { View, Image } from 'react-native';
import SlidingTextInputWithCancel from '../../components/SlidingTextInputWithCancel';

import { TabIcons } from '../../../assets/images/icons';

const SearchScreen = () => {
   const [query, setQuery] = useState('');

   return (
      <View className="flex-1 bg-palette-90 justify-center">
         <View className="flex-1 top-36 items-center">
            <SlidingTextInputWithCancel value={query} onChangeText={setQuery} placeholder="Search" iconLeft={<Image source={TabIcons.glassIconActive} resizeMode="contain" className="w-6 h-5" />} />
         </View>
      </View>
   );
};

export default SearchScreen;

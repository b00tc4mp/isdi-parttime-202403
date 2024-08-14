import React from 'react'
import View from '../../../components/core/View'
import './index.css'
import SummaryWaste from './Summary'
import SummaryStatus from './Status'
import MenuStore from '../MenuStore'

const SummaryStore = () => {

  return (
    <View>
    <div className='SummaryStoreDiv'>
      <SummaryWaste />
      <SummaryStatus />
      <MenuStore />
    </div>
    </View>
  );
};

export default SummaryStore;
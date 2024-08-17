import React from 'react'
import './index.css'
//components
import View from '../../../components/core/View'
import SummaryWaste from './Summary'
import SummaryStatus from './Status'
import MenuStore from '../MenuStore'

const SummaryStore = () => {

  return (
    <View>
    <div className='SummaryStoreDiv'>
    
    <h1 className='RouteTitle'>RESUMEN</h1>

      <SummaryWaste />
      <SummaryStatus />
      <MenuStore />
      
    </div>
    </View>
  );
};

export default SummaryStore;
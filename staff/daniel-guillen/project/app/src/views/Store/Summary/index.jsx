import React from 'react'
import './index.css'
import SummaryWaste from './SummaryWaste'
import SummaryStatus from './SummaryStatus'
import MenuStore from '../MenuStore'

const SummaryStore = () => {

  return (
    <div className='SummaryStoreDiv'>
      <SummaryWaste />
      <SummaryStatus />
      <MenuStore />
    </div>
  );
};

export default SummaryStore;
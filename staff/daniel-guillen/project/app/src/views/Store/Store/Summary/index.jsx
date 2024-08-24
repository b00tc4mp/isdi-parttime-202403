import React from 'react'
import './index.css'
//components
import SummaryWaste from './Summary'
import SummaryStatus from './Status'
import MenuStore from '../../components/MenuStore'

const SummaryStore = () => {

  return (

    <div className='SummaryStoreDiv'>
    
    <h1 className='RouteTitle'>RESUMEN</h1>

      <SummaryWaste />
      <SummaryStatus />
      <MenuStore />
      
    </div>

  );
};

export default SummaryStore;
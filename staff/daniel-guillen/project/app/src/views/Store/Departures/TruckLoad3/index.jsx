import React from 'react'
import RegisterTruckLoad3 from './Register'
import DataLoad3 from './DataLoad3'
import MenuLoads from '../../components/MenuLoads'
import SummaryLoad3 from './DataLoad3/SummaryLoad3'

import '../index.css'

const TruckLoad3 = () => {
  return (
    <div className='container'> 
        <RegisterTruckLoad3 />
        <SummaryLoad3 />
        <DataLoad3 />
        <MenuLoads />
    </div>
  )
}

export default TruckLoad3
import React from 'react'
import RegisterTruckLoad2 from './Register'
import DataLoad2 from './DataLoad2'
import MenuLoads from '../MenuLoads'
import SummaryLoad2 from './DataLoad2/SummaryLoad2'

import '../index.css'

const TruckLoad2 = () => {
  return (
    <div className='container'> 
        <RegisterTruckLoad2 />
        <SummaryLoad2 />
        <DataLoad2 />
        <MenuLoads />
    </div>
  )
}

export default TruckLoad2
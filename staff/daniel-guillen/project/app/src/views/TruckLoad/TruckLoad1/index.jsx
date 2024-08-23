import React from 'react'
import RegisterTruckLoad1 from './Register'
import DataActecoList from './DataLoad1'
import MenuLoads from '../MenuLoads'
import SummaryActeco from './DataLoad1/SummaryLoad1'

import '../index.css'

const TruckLoad1 = () => {
  return (
    <div className='container'> 
        <RegisterTruckLoad1 />
        <SummaryActeco />
        <DataActecoList />
        <MenuLoads />
    </div>
  )
}

export default TruckLoad1
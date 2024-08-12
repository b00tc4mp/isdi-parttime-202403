import React from 'react'
import ActecoTruckLoad from './Register'
import DataActecoList from './DataActeco'
import MenuLoads from '../MenuLoads'
import SummaryActeco from './DataActeco/SummaryActeco'

import '../index.css'

const TruckLoad = () => {
  return (
    <div className='TruckLoad'> 
        <ActecoTruckLoad />
        <SummaryActeco />
        <DataActecoList />
        <MenuLoads />
    </div>
  )
}

export default TruckLoad
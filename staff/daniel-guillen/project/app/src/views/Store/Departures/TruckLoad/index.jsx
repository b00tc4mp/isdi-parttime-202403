import React from 'react'
import RegisterTruckLoad from './Register'
import DataTruckLoad from './DataLoad'
import MenuLoads from '../../components/MenuLoads'
import SummaryLoad from './DataLoad/SummaryLoad'

import '../index.css'

const TruckLoad = () => {
  return (
    <div className='container'> 
        <RegisterTruckLoad />
        <SummaryLoad />
        <DataTruckLoad />
        <MenuLoads />
    </div>
  )
}

export default TruckLoad
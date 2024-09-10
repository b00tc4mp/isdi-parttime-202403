//import { useState } from 'react'
import Register from './Register'
import WasteLoad from './DataLoad'
import MenuLoads from '../components/MenuLoads'
import SummaryLoad from './DataLoad/SummaryLoad'
import './index.css'
import ReferenceLoad from '../components/ReferenceLoad'

const Departures = () => {

  return (
    <div className='container'>
      <h1 className='RouteTitle'>SALIDAS</h1>

      <div className='Departures'>
      <ReferenceLoad />
      <Register />
      </div>

      <SummaryLoad />
      <WasteLoad />
      <MenuLoads />
    </div>
  )
}

export default Departures

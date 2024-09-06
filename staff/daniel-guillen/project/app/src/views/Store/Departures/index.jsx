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
      <div className='LoadTitle'>
      <h3 className='title'>Registrar carga para</h3><ReferenceLoad />
      </div>
      <Register />
      <SummaryLoad />
      <WasteLoad />
      <MenuLoads />
    </div>
  )
}

export default Departures

import React from 'react'
import './index.css'

const MenuLoads = () => {
  return (

    <div className='MenuLoadsDiv' >
    <ul className='MenuLoads'>
      <li><a className='menu-loads-start' href="/TruckLoad1">Carga 1</a></li>
      <li><a className='menu-loads-center' href="/Truckload2">Carga 2</a></li>
      <li><a className='menu-loads-end' href="/Truckload3">Carga 3</a></li>
    </ul>
  </div>
  )
}

export default MenuLoads
import React from 'react'
import './index.css'
import View from '../../../components/core/View'

const MenuStore = () => {
  return (

    <div className='MenuStoreDiv' >
    <ul className='MenuStore'>
      <li><a className='menu-store-start' href="/Store">INVENTRARIO</a></li>
      <li><a className='menu-store-center' href="/Store/Summary">RESUMEN</a></li>
      <li><a className='menu-store-end' href="/Store/Search">BUSCAR</a></li>
      {/* <li><a className='menu-store-end' href="/Store/Statistics">ESTADISTICAS</a></li> */}
    </ul>
  </div>
  )
}

export default MenuStore
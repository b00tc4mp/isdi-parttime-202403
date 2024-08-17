import React from 'react'
import './index.css'

const MenuStore = () => {
  return (
    <div className='MenuStoreDiv' >

    <ul className='MenuStore'>
      <li><a className='menu-store-start' href="/Stored">INVENTRARIO</a></li>
      <li><a className='menu-store-center' href="/Store/Summary">RESUMEN</a></li>
      <li><a className='menu-store-end' href="/Store/Search">BUSCADOR</a></li>
      {/* <li><a className='menu-store-end' href="/Store/Statistics">ESTADISTICAS</a></li> */}
    </ul>

  </div>
  )
}

export default MenuStore
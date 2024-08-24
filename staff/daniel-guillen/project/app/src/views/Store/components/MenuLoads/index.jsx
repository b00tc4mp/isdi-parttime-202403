import React from 'react'
import michelangelo64 from '../../../../components/img/michelangelo64.png'

const MenuStore = () => {
  return (
    <div className='menuFooterDiv' >

    <ul className='menuFooter'>
      <a className='menuFooter-start' href="/Store">🔙</a>
      <a className='menuFooter-center' href="/Departures/TruckLoad"><img className='ButtonImage' src={michelangelo64} /></a>
      <a className='menuFooter-end' href="/Departures/Search">🔎</a>
    </ul>

  </div>
  )
}

export default MenuStore
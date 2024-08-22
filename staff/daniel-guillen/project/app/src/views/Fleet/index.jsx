import React from 'react'
import './index.css'
//img
import van1 from './img/van1.jpg'
import van2 from './img/van2.jpg'
import truck3 from './img/truck3.jpg'
import truck4 from './img/truck4.jpg'
import truck5 from './img/truck5.jpg'
import truck6 from './img/truck6.jpg'

const Fleet = () => {
  return (

    <div className='FleetOptions'>
      
      <a href="/Fleet/van1"><img className='ImageFleet' src={van1} /> </a>
      
      <a href="/Fleet/van2"><img className='ImageFleet' src={van2} /> </a>
      
      <a href="/Fleet/truck3"><img className='ImageFleet' src={truck3} /> </a>

      <a href="/Fleet/truck4"><img className='ImageFleet' src={truck4} /> </a>
    
      <a href="/Fleet/truck5"><img className='ImageFleet' src={truck5} /> </a>

      <a href="/Fleet/truck6"><img className='ImageFleet' src={truck6} /> </a>
    </div>
  )
}

export default Fleet
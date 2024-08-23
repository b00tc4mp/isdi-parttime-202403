import React from 'react'
import './index.css'
//img
import van1 from './img/van1.jpg'
import van2 from './img/van2.jpg'
import truck3 from './img/truck3.jpg'
import truck4 from './img/truck4.jpg'
import truck5 from './img/truck5.jpg'
import truck6 from './img/truck6.jpg'

const Vehicles = () => {
  return (

    <div className='VehiclesOptions'>
      
      <a href="/Vehicles/van1"><img className='ImageVehicles' src={van1} /> </a>
      
      <a href="/Vehicles/van2"><img className='ImageVehicles' src={van2} /> </a>
      
      <a href="/Vehicles/truck3"><img className='ImageVehicles' src={truck3} /> </a>

      <a href="/Vehicles/truck4"><img className='ImageVehicles' src={truck4} /> </a>
    
      <a href="/Vehicles/truck5"><img className='ImageVehicles' src={truck5} /> </a>

      <a href="/Vehicles/truck6"><img className='ImageVehicles' src={truck6} /> </a>
    </div>
  )
}

export default Vehicles
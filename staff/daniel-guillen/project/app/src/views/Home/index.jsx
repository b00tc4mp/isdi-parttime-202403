import React from 'react'
//img
import store from '../../components/img/store.jpg'
import vehicles from '../../components/img/vehicles.jpg'
import admin from '../../components/img/admin.jpg'

const Home = () => {
  return (

    <div className='container'>
      
      <a href="/Store"><img className='image' src={store} /> </a>
      
      <a href="/Vehicles"><img className='image' src={vehicles} /> </a>
      
      <a href="/Admin"><img className='image' src={admin} /> </a>
    
    </div>

  )
}

export default Home
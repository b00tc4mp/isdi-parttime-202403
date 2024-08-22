import React from 'react'
import './index.css'
//components
import View from '../../components/core/View'
//img
import store from './img/store.jpg'
import departures from './img/departures.jpg'
import fleet from './img/fleet.jpg'
import users from './img/users.jpg'

const Home = () => {
  return (
    <View>
    <div className='homeOptions'>
      
      <a href="/Stored"><img className='image' src={store} /> </a>
      
      <a href="/TruckLoad1"><img className='image' src={departures} /> </a>
      
      <a href="/Fleet"><img className='image' src={fleet} /> </a>
      
      <a href="/Users"><img className='image' src={users} /> </a>
    
    </div>
    </View>
  )
}

export default Home
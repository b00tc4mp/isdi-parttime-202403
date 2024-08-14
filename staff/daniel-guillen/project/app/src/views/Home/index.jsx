import React from 'react'
import './index.css'
import store from './store.jpg'
import departures from './departures.jpg'
import fleet from './fleet.jpg'
import users from './users.jpg'

const Home = () => {
  return (
    <div className='homeOptions'>
      <a href="/Store"><img className='image' src={store} /> </a>
      <a href="/Acteco"><img className='image' src={departures} /> </a>
      <a href="/Fleet"><img className='image' src={fleet} /> </a>
      <a href="/Users"><img className='image' src={users} /> </a>
    </div>
  )
}

export default Home
import React from 'react'
import './index.css'
import register from '../../components/img/register.jpg'
import users from '../../components/img/users.jpg'

const index = () => {
  return (

    <div className='container'>
      
      <a href="/Admin/register"><img className='image' src={register} /> </a>
      
      <a href="/Admin/users"><img className='image' src={users} /> </a>
    
    </div>

  )
}

export default index
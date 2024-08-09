import React from 'react'
import Register from './Register'
import './index.css'
import DataStoreList from './DataStore'

const Store = () => {
  return (
    <div className='Store'>
        <Register />
        <DataStoreList />
    </div>
  )
}

export default Store
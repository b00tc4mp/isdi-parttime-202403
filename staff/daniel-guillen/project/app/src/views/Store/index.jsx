import React from 'react'
import Register from './Register'
import './index.css'
import DataStoreList from './DataStore'
import MenuStore from '././MenuStore/'

const Store = () => {
  return (
    <div className='Store'>
        <Register />
        <DataStoreList />
        <MenuStore />
    </div>
  )
}

export default Store
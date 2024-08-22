import React from 'react'
import './index.css'
//components
import Register from './Register'
import DataStoreList from './DataStore'
import MenuStore from '../MenuStore'

const Store = () => {
  return (

    <div className='container'>
        <Register />
        <DataStoreList />
        <MenuStore />
    </div>
  )
}

export default Store
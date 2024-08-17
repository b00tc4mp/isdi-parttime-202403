import React from 'react'
import './index.css'
//components
import View from '../../../components/core/View'
import Register from './Register'
import DataStoreList from './DataStore'
import MenuStore from '../MenuStore'

const Store = () => {
  return (
    <View>
    <div className='Store'>
        <Register />
        <DataStoreList />
        <MenuStore />
    </div>
    </View>
  )
}

export default Store
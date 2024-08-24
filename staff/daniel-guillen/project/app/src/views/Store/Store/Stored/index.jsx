import React, { useState } from 'react'
import './index.css'
//components
import Register from './Register'
import DataStoreList from './DataStore'
import MenuStore from '../../components/MenuStore'

const Store = () => {

  const [refreshList, setRefreshList] = useState(false)

  const refreshData = () => {
    setRefreshList(!refreshList)
  }

  return (
    <div className='container'>
        <Register refreshData={refreshData}/>
        <DataStoreList refreshList={refreshList} refreshData={refreshData} />  {/* Pasamos refreshList */}
        <MenuStore />
    </div>
  )
}

export default Store
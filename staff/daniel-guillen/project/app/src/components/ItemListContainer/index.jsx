import React, { useEffect, useState } from 'react'
import getItemListContainer from './getItemListContainer'
import './index.css'
import ItemList from './ItemList'

const ItemListContainer = () => {

  let [listContainer, setListContainer] = useState([])
  
  useEffect(() => {
    getItemListContainer()
      .then((res) => {
        setListContainer(res)
    })
  }, [])
  
  return (
    <div>
      <ItemList key={listContainer.id} listContainer={listContainer}/>
    </div>
  )
}

export default ItemListContainer
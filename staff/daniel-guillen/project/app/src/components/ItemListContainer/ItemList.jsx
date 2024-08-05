import React from 'react'
import Item from './Item'

const ItemList = ( {listContainer} ) => {
  return (
    <div>
      <h1>List Container</h1>
            {
        listContainer.length > 0 &&

        listContainer.map((container) =>{
          return (
                  <Item key={container.id} container={container}/>
                  )
        })
      }
    </div>
  )
}

export default ItemList
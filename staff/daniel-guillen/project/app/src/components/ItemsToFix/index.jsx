import React from 'react'
import './index.css'

const ItemsToFix = ({ items }) => (
  <div className='ItemsToFix'>
    <h3 className='Total'>Total de elementos a arreglar: <strong>{items.length}</strong></h3>

      {items.map(item => (
        <p className='ItemsToFix' key={item.id}>
          {item.apartado}: {item.elemento}
        </p>
      ))}

  </div>
)

export default ItemsToFix

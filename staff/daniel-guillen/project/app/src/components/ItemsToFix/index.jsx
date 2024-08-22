import React from 'react'
import './index.css'
import View from '../core/View'

const ItemsToFix = ({ items }) => (
  <View>
  <div className='container'>
    <h3>Total de elementos a arreglar: <strong>{items.length}</strong></h3>
    <ul>
      {items.map(item => (
        <li className='ItemsToFix' key={item.id}>
          {item.apartado}: {item.elemento}
        </li>
      ))}
    </ul>
  </div>
  </View>
)

export default ItemsToFix

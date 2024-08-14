import React from 'react'
import './index.css'

const WasteItem = ({ item, onDelete }) => {
  const shortDescription = item.description.length > 34
    ? item.description.substring(0, 34) + '...'
    : item.description

  return (
    <button
      className={`NewWasteDiv ${item.container} ${item.status}`}
      onClick={() => onDelete(item.id)}
    >
      <div className='NewWaste'>
        <p>{item.code} - {item.container} - {item.weight}kg</p>
        <p className='ShortDescription'>{shortDescription}</p>
      </div>
    </button>
  )
}

export default WasteItem
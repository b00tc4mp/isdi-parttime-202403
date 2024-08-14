import React from 'react'
import '../index.css'

const StagnantWasteItem = ({ item }) => {
  const shortDescription = item.description.length > 34
    ? item.description.substring(0, 34) + '...'
    : item.description

  return (
    <div className='StagnantWasteDiv'>
      <p>{item.code} - {item.container} - {item.weight}kg</p>
      <p className='ShortDescription'>{shortDescription}</p>
    </div>
  )
}

export default StagnantWasteItem
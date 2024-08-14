import React from 'react'

const GroupedWasteItem = ({ item }) => {
  const shortDescription = item.description.length > 34
    ? item.description.substring(0, 34) + '...'
    : item.description

  return (
    <div className='SummaryWasteDataDiv' key={item.id}>
      <p>{item.code} - Total: {item.totalWeight}kg</p>
      <p className='ShortDescription'>{shortDescription}</p>
    </div>
  )
}

export default GroupedWasteItem
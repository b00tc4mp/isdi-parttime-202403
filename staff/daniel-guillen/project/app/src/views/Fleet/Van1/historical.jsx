import React from 'react'
import useFetchItemsList from '../../../hooks/useFetchItemsList'
import '../index.css'
const HistoricalVan1 = () => {
  
  const { list } = useFetchItemsList('dataCheckVan1')

  // ordenamos de mas actual a menos
  const sortedList = list.sort((b, a) => new Date(b.date) - new Date(a.date))

  // traemos la fecha de hoy para calcularlo
  const month = new Date().toLocaleString('default', { month: 'long' })
  const year = new Date().getFullYear()

  return (
    <div>

      <h2 className='title'>HISTORIAL f {month}/{year}</h2>
      
      {sortedList.map((item, index) => (
        <div className='Historical' key={index}>
          <p>{item.date} - {item.workerName}</p>
          <p>{item.itemsToFix}</p>
          <p>{item.notes}</p>
        </div>
      ))}
    
    </div>
  )
}

export default HistoricalVan1

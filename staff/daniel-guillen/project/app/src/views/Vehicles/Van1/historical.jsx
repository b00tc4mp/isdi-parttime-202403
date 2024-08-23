import React from 'react'
import '../index.css'
//components
import InspectionItem from '../../../components/InspectionItem'
//hooks
import useFetchList from '../../../hooks/useFetchList'
//utils
import getWeekNumberYear from '../../../utils/getWeekNumberYear'

const HistoricalVan1 = () => {

  const { week, year } = getWeekNumberYear()
  //buscamos todas las notas de inspeccion
  const { list } = useFetchList('dataCheckVan1')

 // Filtramos las notas del año actual y ordenamos por semana
 const filteredItems = list
 .filter(item => item.year === year)
 .sort((a, b) => b.week - a.week) // Ordenamos de la semana más reciente a la más antigua
  return (

    <div>
      <h2 className="title">HISTORIAL FURGÓN 1</h2>
      {filteredItems.map((item, index) => (
        //renderizamos todas las notas con unos estilos especificos
        <InspectionItem key={index} item={item} />
      ))}

      <div className='Button'>
        
        <a className='menu-link' href="/Vehicles/Van1">VOLVER</a>
              
      </div>

    </div>

  )
}

export default HistoricalVan1
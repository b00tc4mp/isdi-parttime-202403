import './index.css'
import { useState, useEffect } from 'react'
import { Title, SubTitle, Text } from '../../../../components/core'
import { GroupedWasteItem, StagnantList, MenuStore } from '../../../../components/store'
import fetchStoredWaste from '../../../../logic/stored/getWasteStored.js'
import getTodayMonthYear from '../../../../utils/getTodayMonthYear.js'

const StoredWasteSummary = () => {
  const token = sessionStorage.getItem('token') 
  const [data, setData] = useState([])  
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null) 
  const { month, year } = getTodayMonthYear()
  
  useEffect(() => {
    fetchStoredWaste(month, year, token, setData, setLoading, setError)
  }, [month, year, token])

  return (
    <div className='SummaryStoreDiv'>
      <Title>RESUMEN</Title>

      {loading ? (
        <Text className="Loading">Cargando resumen de residuos en el almacén...</Text>
      ) : error ? (
        <Text className="Error">Error al cargar los datos: {error}</Text>
      ) : data.length === 0 ? (
        <Text className="Empty">No hay residuos almacenados este mes.</Text>
      ) : (
        <>
          <SubTitle className='Title'>Datos de residuos {month}/{year}:</SubTitle>
          <GroupedWasteItem data={data} />

          <SubTitle className='Title'>Residuos estancados {month}/{year}:</SubTitle>
          <StagnantList data={data} />
        </>
      )}

      <MenuStore />
    </div>
  )
}

export default StoredWasteSummary
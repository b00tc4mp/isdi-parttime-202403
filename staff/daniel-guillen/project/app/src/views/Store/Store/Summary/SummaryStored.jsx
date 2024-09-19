import { useState, useEffect } from 'react'
import './index.css'
// components
import GroupedWasteItem from '../../components/GroupedWasteItem'
// logic
import fetchStoredWaste from '../../../../logic/getWasteStored.js'

const SummaryStored = () => {
  const [token] = useState(sessionStorage.getItem('token'))[0] // obtener el token de sessionStorage

  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  // obtener la lista de residuos del servidor
  useEffect(() => {
    // llamamos a fetchStoredWaste cuando se monta el componente
    fetchStoredWaste(token, setData, setLoading, setError)
  }, [token])

    // Cargando...
    if (loading) {
      return <p style={{ color: 'white', textAlign: 'center' }}>Cargando resumen de residuos en el almacén...</p>
    }
  
    // Mensaje de error
    if (error) {
      return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
    }

    // Agrupar, mostrar una sola iteración y sumar el peso total por código
    const groupedItemCode = data.reduce((acc, item) => {
      const existingItemCode = acc.find(i => i.code === item.code)
      if (existingItemCode) {
        existingItemCode.totalWeight += parseFloat(item.weight)
      } else {
        acc.push({ ...item, totalWeight: parseFloat(item.weight) })
      }
      return acc
    }, [])
  
    // ordenamos por código
    const filteredItems = groupedItemCode.sort((a, b) => a.code.localeCompare(b.code))

  return (

      <div className='SummaryDiv'>

        <h2 className='title'>Datos resumidos de Residuos:</h2>
        
        {filteredItems.map(item => (
          <GroupedWasteItem key={item.id} item={item} />
        ))}
      
      </div>

  );
};

export default SummaryStored
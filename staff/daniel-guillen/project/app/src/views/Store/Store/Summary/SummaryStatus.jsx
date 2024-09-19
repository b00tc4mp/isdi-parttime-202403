import { useState, useEffect } from 'react'
import './index.css'
// logic
import fetchStoredWaste from '../../../../logic/getWasteStored.js'

const SummaryStatus = () => {
  const [token] = useState(sessionStorage.getItem('token')) // obtener el token de sessionStorage

  const [data, setData] = useState([])  // almacenar la lista de residuos
  const [loading, setLoading] = useState(true) // mostrar el estado de carga
  const [error, setError] = useState(null) // manejar errores

  // obtener la lista de residuos del servidor
  useEffect(() => {
    // llamamos a fetchStoredWaste cuando se monta el componente
    fetchStoredWaste(token, setData, setLoading, setError)
  }, [token])

  // Filtrar residuos estancados (status = 'ESTANCADO') y ordenar por código
  const stagnantList = data
    .filter(item => item.status === 'ESTANCADO')
    .sort((a, b) => a.code.localeCompare(b.code))

  // cargando...
  if (loading) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Cargando residuos estancados en el almacén...</p>
  }
  // error
  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>Error al cargar los datos: {error}</p>
  }

  return (
    <div className='SummaryDiv'>

      <h2 className='title'>Residuos estancados:</h2>

      {stagnantList.length > 0 ? (
        stagnantList.map(item => {
          const shortDescription = item.description.length > 34
            ? item.description.substring(0, 34) + '...'
            : item.description
          return (
            <div key={item.id} className='StagnantWasteDiv'>
              <p>{item.code} - {item.container} - {item.weight}kg</p>
              <p className='ShortDescription'>{shortDescription}</p>
            </div>
          )
        })
      ) : (
        <p style={{ color: 'white' }}>No hay residuos estancados este mes.</p>
      )}
      
    </div>
  )
}

export default SummaryStatus

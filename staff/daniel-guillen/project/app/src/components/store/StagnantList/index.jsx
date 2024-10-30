import './index.css'
import { Text } from "../../core"

const StagnantList = ({ data }) => {
  const stagnantList = data
    .filter(item => item.status === 'ESTANCADO')
    .sort((a, b) => a.code.localeCompare(b.code))

  return (
    <>
      {stagnantList.length > 0 ? (
        stagnantList.map(item => {
          const shortDescription = item.description.length > 34
            ? item.description.substring(0, 34) + '...'
            : item.description
          return (
            <div key={item.id} className='StagnantWasteDiv'>
              <Text>{item.code} - {item.container} - {item.weight}kg</Text>
              <Text className='ShortDescription'>{shortDescription}</Text>
            </div>
          )
        })
      ) : (
        <Text className="Empty">No hay residuos estancados.</Text>
      )}
    </>
  )
}

export default StagnantList
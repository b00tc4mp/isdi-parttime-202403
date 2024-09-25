import './index.css'
// utils
import sortWasteItems from '../../../utils/sortWasteItems'
// components
import Text from '../../core/Text'
import Button from '../../core/Button'

const WasteList = ({ data = [], handleDeleteWaste }) => {

  const sortedData = sortWasteItems(data)

  return (
    <div className='WasteList'>
      {sortedData.map(item => {
        const shortDescription = item.description.length > 34
          ? item.description.substring(0, 34) + '...'
          : item.description

        return (
          <div key={item.id} className='list'>
            <Button className={`NewWasteDiv ${item.container} ${item.status}`} onClick={() =>
              handleDeleteWaste(item.id)}>
                
                <Text>{item.code} - {item.container} - {item.weight}kg</Text>
                <Text className='ShortDescription'>{shortDescription}</Text>
            
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default WasteList

import'./index.css'
import Text from '../../core/Text'

 const GroupedWasteItem = ({ item }) => {
  const shortDescription = item.description.length > 34
    ? item.description.substring(0, 34) + '...'
    : item.description

  return (
    <div className='SummaryWasteDataDiv' key={item.id}>
      <Text>{item.code} - Total: {item.totalWeight}kg</Text>
      <Text className='ShortDescription'>{shortDescription}</Text>      
    </div>
  )
}

export default GroupedWasteItem
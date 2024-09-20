import './index.css'
import sortWasteItems from '../../../../utils/sortWasteItems'

const WasteList = ({ data = [], handleDeleteWaste }) => {

  const sortedData = sortWasteItems(data)

  return (
    <>
      {sortedData.map(item => {
        const shortDescription = item.description.length > 34
          ? item.description.substring(0, 34) + '...'
          : item.description

        return (
          <div key={item.id} className='list'>
            <button
              className={`NewWasteDiv ${item.container} ${item.status}`}
              onClick={() => handleDeleteWaste(item.id)}
            >
              <div className='NewWaste'>
                <p>{item.code} - {item.container} - {item.weight}kg</p>
                <p className='ShortDescription'>{shortDescription}</p>
              </div>
            </button>
          </div>
        )
      })}
    </>
  )
}

export default WasteList

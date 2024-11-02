import { Text } from "../../core"

const ItemsToFix = ({ items }) => (
  <div className='ItemsToFix'>
    <h3 className='Total'>Total de elementos a arreglar: <strong>{items.length}</strong></h3>

      {items.map(item => (
        <Text className='ItemsToFix' key={item.id}>
          {item.apartado}: {item.elemento}
        </Text>
      ))}

  </div>
)

export default ItemsToFix

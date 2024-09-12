import './index.css'

const WasteItem = ({ item, onDelete }) => {
  // limitamos description a 34 caracteres
  const shortDescription = item.description.length > 34
    ? item.description.substring(0, 34) + '...'
    : item.description

  return (
    //renderizamos el residuo en un boton con estilos especificos
      <div className='list'>
      <button
      className={`NewWasteDiv ${item.container} ${item.status}`}
      onClick={() => onDelete(item.id)}
    //al cliclar dialogo eliminar si/no
    >

      <div className='NewWaste'>
        <p>{item.code} - {item.container} - {item.weight}kg</p>
        <p className='ShortDescription'>{shortDescription}</p>
      </div>

    </button>
    </div>
  )
}

export default WasteItem
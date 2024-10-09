import './index.css'

const InspectionItem = ({ item }) => {
  
  return (
    <div className="Historical">

        <div className='Date'>
        <p>Inspeccionado por: {item.name} </p>
        <p>Semana {item.week} del año {item.year}</p>
        </div>

        {/* itemsToFix contiene todos los marcados 'ARREGLAR' (array) y los renderizamos en una lista */}
        <div className='Fix'>
            <h3>Elementos a arreglar:</h3>
        <ul>
          {item.itemsToFix.map((fixItem, idx) => (
            <li key={idx}>
              {fixItem}
            </li>
          ))}
        </ul>
        </div>

        <div>
        <p>{item.notes}</p>
        </div>

    </div>
  )
}

export default InspectionItem
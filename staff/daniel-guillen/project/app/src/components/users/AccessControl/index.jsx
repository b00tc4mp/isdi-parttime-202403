import './index.css'
import Text from '../../core/Text'

const AccessControl = ({ valueAccess, handleAccessChange }) => {
  return (
    <div className='AccessOptionsDiv'>
      <Text>Control de accesos 🔒</Text>

      <div className='Access'>
        Acceso a
        <select required
          className="AccessOption"
          value={valueAccess} 
          onChange={(e) => handleAccessChange(e.target.value)}
        > <option value="">seleccionar una opción</option>
          <option value="almacen">Almacén y salidas 📦</option>
          <option value="vehiculos">Inspección de vehículos 🚚</option>
          <option value="admin">Admin 🔑</option> 
          {/* <option value="furgon2">Furgon2 🚙</option>
          <option value="camion3">Camion3 🚚</option>
          <option value="camion4">Camion4 🚚</option>
          <option value="camion5">Camion5 🚛</option>
          <option value="camion6">Camion6 🚛</option> */}
        </select>
      
      </div>
        
    </div>
  )
}

export default AccessControl
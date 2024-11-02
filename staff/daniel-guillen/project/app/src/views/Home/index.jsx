import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/core'

const Home = () => {
  const navigate = useNavigate() 

  return (
    <div className='home'>
      
      <Button className="MenuButton" onClick={() => navigate('/StoreWaste/storedwaste')}>📦 INVENTARIO DE ALMACÉN
      </Button>
      <Button className="MenuButton" onClick={() => navigate('/StoreWaste/storedwastesummary')}>📊 RESUMEN DE INVENTARIO
      </Button>
      <Button className="MenuButton" onClick={() => navigate('/StoreWaste/searchstoredwaste')}>🔎 BUSCAR RESIDUO ALMACENADO
      </Button>
      
      <Button className="MenuButton" onClick={() => navigate('/Departures/registerload')}>🚚 REGISTRAR SALIDA DE RESIDUO
      </Button>
      <Button className="MenuButton" onClick={() => navigate('/Departures/searchdepartures')}>🔎 BUSCAR SALIDA DE RESIDUO
      </Button>
      
      <Button className="MenuButton" onClick={() => navigate('/vehicles/inspection')}>🔧 INSPECCIÓN DE VEHÍCULOS
      </Button>
      
      <Button className="MenuButton" onClick={() => navigate('/Admin')}>💻 ADMINISTRADOR
      </Button>
    </div>
  )
}

export default Home
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/core'

const Index = () => {
  const navigate = useNavigate()

  return (
    <div className='Admin'>
      <h1 className='RouteTitle'>ADMIN</h1>
      <Button className="MenuButton" onClick={() => navigate('/Admin/registeruser')}>✍️ REGISTRAR USUARIO
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/Admin/userslist')}>👷LISTA DE USUARIOS
      </Button>

      <Button className="MenuButton" onClick={() => navigate('/')}> VOLVER
      </Button>
    </div>
  )
}

export default Index
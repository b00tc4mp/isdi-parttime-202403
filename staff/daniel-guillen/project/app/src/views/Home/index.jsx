import { useNavigate } from 'react-router-dom'
// components
import Button from '../../components/core/Button'
// img
import store from '../../components/img/store.jpg'
import vehicles from '../../components/img/vehicles.jpg'
import admin from '../../components/img/admin.jpg'
// utils
import useAuthRedirect from '../../utils/noTokenRedirect'

const Home = () => {
  useAuthRedirect() // si no hay token redirigir a login
  const navigate = useNavigate() 

  return (
    <div className='Home'>
      <Button onClick={() => navigate('/Store')}>
        <img className='image' src={store} alt="Store" />
      </Button>

      <Button onClick={() => navigate('/Vehicles')}>
        <img className='image' src={vehicles} alt="Vehicles" />
      </Button>

      <Button onClick={() => navigate('/Admin')}>
        <img className='image' src={admin} alt="Admin" />
      </Button>
    </div>
  )
}

export default Home
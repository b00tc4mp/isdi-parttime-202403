import { useNavigate } from 'react-router-dom'
// components
import Button from '../../components/core/Button'
// img
import register from '../../components/img/register.jpg'
import users from '../../components/img/users.jpg'
// utils
import useAuthRedirect from '../../utils/noTokenRedirect'

const Index = () => {
  const navigate = useNavigate()
  useAuthRedirect() // si no hay token redirigir a login

  return (
    <div className='Admin'>
      <Button onClick={() => navigate('/Admin/register')}>
        <img className='image' src={register} alt="Register" />
      </Button>

      <Button onClick={() => navigate('/Admin/users')}>
        <img className='image' src={users} alt="Users" />
      </Button>
    </div>
  )
}

export default Index
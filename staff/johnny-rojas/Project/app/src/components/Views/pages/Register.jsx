import View from '../core/View'
import Field from '../core/Field'
import Title from '../core/Title'
import FormWithPanel from '../core/FormWithPanel'
import ShowHidePassword from '../core/ShowHidePassword'
import SubmitButton from '../core/SubmitButton'

// import Register from './Register.css'

import { Link, useNavigate } from 'react-router-dom'


function Register() {
  const navigate = useNavigate()

  navigate('/login')

  return <View tag='main'>
    
    <Title className='TitlePrincipalRegister'>Regístrate</Title>

    <FormWithPanel className="RegisterForm" >
      
      <Field id='name' type='text' placeholder='Nombre'></Field>

      <Field id='surname' type='text' placeholder='Apellidos'></Field>

      <Field id='email' type='email' placeholder='Email'></Field>
      
      <Field id='email' type='email' placeholder='Email'></Field>

      <ShowHidePassword id='password' type='password' placeholder='Contraseña'></ShowHidePassword>

      <ShowHidePassword id='repeatPassword' type='password' placeholder='Repetir contraseña'></ShowHidePassword>

    </FormWithPanel>

    <SubmitButton>Regístrate</SubmitButton>

    <p>¿Ya tienes cuenta?</p>

    <Link className='Link' to='/login'>Inicia sesión</Link>

  </View>
}

export default Register
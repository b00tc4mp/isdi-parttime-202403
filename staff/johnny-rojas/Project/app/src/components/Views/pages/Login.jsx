import View from '../core/View'
import Title from '../core/Title'
import FormWithPanel from '../core/FormWithPanel'
import Field from '../core/Field'
import ShowHidePassword from '../core/ShowHidePassword'
import SubmitButton from '../core/SubmitButton'

import { Link } from 'react-router-dom'


function Login() {

  return <View tag='main'>

    <Title className='TitlePrincipalLogin'>Inicia sesión</Title>

    <FormWithPanel className="Form FormWithFeedback">

      <Field id='email' type='email' placeholder='Email'></Field>

      <ShowHidePassword id='name' type='password' placeholder='Contraseña'></ShowHidePassword>

    </FormWithPanel>

    <SubmitButton>Inicia sesión</SubmitButton>

    <p>¿No tienes cuenta?</p>

    <Link className='Link' to='/register'>Regístrate</Link>
  </View>
}

export default Login
import Header from '../core/Header'
import TopBar from '../library/TopBar'
import View from '../core/View'
import Title from '../core/Title'
import FormWithPanel from '../core/FormWithPanel'
import Field from '../core/Field'
import SubmitButton from '../core/SubmitButton'
import logic from '../../../logic/index'
import { getUserId } from '../../../logic/getUserInfo'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UseContext from "../core/UseContext"
import Confirm from '../core/Confirm'

import './ManageProfile.css'

function ManageProfile() {
  const userId = getUserId()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const { alert } = UseContext()
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    try {
      logic.getUserName(userId)
        .then(name => setUser(name))
        .catch(error => alert(error.message))

    } catch (error) {
      alert(error.message)
    }

  }, [userId])

  const handleUpdateUserContact = event => {

    event.preventDefault()

    const target = event.target

    const email = target.email.value
    const phone = target.phone.value

    const updates = {
      email,
      phone
    }

    try {
      logic.updateUserContact(userId, updates)
        .then(() => {
          return logic.getUserName(userId)
        })
        .then(updatedUser => {
          setUser(updatedUser)
        })
        .catch(error => alert(error.message))
    } catch (error) {
      alert(error)
    }
  }

  const handleCloseAccount = () => {
    try {
      logic.closeAccount(userId)
        .then(() => {
          logic.logoutUser()
          navigate('/')
        })
        .catch(error => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }

  const handleShowConfirmCancel = () => {
    setShowConfirm(!showConfirm)
  }

  return (
    <div>
      <Header>
        <TopBar />
      </Header>
      <div className='ManageProfile'>
        <View className='RegisterForm' tag='main'>

          <Title className='TitleCreateRoom'>Edita tu informacion de contacto</Title>

          <h2 className='infoUserTitle'>Hola {user.name}</h2>
          <p>Estos son tus datos actuales:</p>
          <p><span>Email:</span> {user.email}</p>
          <p><span>Telefono:</span> {user.phone}</p>
          <p className='infoUser'>Aquí puedes actualizar tus datos de contacto. Recuerda
            que debes tener tus datos al día para tener una comunicación optima, muchas gracias.</p>

          <FormWithPanel onSubmit={handleUpdateUserContact}>

            <Field id='email' type='email' placeholder='Email'></Field>

            <Field id='phone' type='string' placeholder='Teléfono +58'></Field>

            <SubmitButton>Realizar cambios</SubmitButton>

          </FormWithPanel>

          <div className='Delete'>
            <button onClick={handleShowConfirmCancel}>Eliminar cuenta</button>
          </div>

        </View>

        {showConfirm && (
          <Confirm
            setShowConfirmCancel={handleShowConfirmCancel}
            handleCloseAccount={handleCloseAccount}
          />
        )}

      </div>
    </div>

  )
}
export default ManageProfile

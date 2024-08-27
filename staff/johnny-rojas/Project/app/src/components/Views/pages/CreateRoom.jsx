import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../library/TopBar'
import Header from '../core/Header'
import CreateRoomInfo from './CreateRoomInfo'
import FormWithPanel from '../core/FormWithPanel'
import View from '../core/View'
import SubmitButton from '../core/SubmitButton'
import Field from '../core/Field'
import Title from '../core/Title'
import UseContext from "../core/UseContext"

import logic from '../../../logic'

import './CreateRoom.css'

function CreateRoom() {
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()
  const { alert } = UseContext()

  const handleCreateRoomSubmit = event => {
    event.preventDefault()

    const target = event.target

    const nameRoom = target.nameRoom.value
    const region = target.region.value
    const city = target.city.value
    const img = target.img.value
    const description = target.description.value
    const price = target.price.value

    try {
      logic.createRoom(nameRoom, region, city, img, description, price)
        .then(() => navigate('/'))
        .catch(error => alert(error.message))

    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <div>
      <div>
        <Header>
          <TopBar />
        </Header>
      </div>
      <View>
        {!showForm ? (
          <CreateRoomInfo onClick={() => setShowForm(true)} />
        ) : (
          <div>
            <View className='RegisterForm' tag='main'>

              <Title className='TitleCreateRoom'>Hazte anfitrión</Title>

              <FormWithPanel onSubmit={handleCreateRoomSubmit}>

                <Field id='nameRoom' type='text' placeholder='Nombre de la habitación' />

                <Field id='region' type='text' placeholder='Región' />

                <Field id='city' type='text' placeholder='Estado y ciudad' />

                <Field id='img' type='string' placeholder='Imagen principal (link)' />

                <Field id='description' type='string' placeholder='Descripción del alojamiento' />

                <Field id='price' type='string' placeholder='Precio por noche' />

                <SubmitButton>Ofrecer</SubmitButton>

              </FormWithPanel>
            </View>
          </div>
        )
        }
      </View >
    </div >
  );
}

export default CreateRoom;


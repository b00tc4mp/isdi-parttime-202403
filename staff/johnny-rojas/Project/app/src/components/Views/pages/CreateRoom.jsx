import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../library/TopBar';
import Header from '../core/Header';
import CreateRoomInfo from './CreateRoomInfo'
import FormWithPanel from '../core/FormWithPanel';
import View from '../core/View';
import SubmitButton from '../core/SubmitButton';
import Field from '../core/Field';
import Title from '../core/Title';
import ServicesSelect from '../library/ServicesSelect'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import logic from '../../../logic';

import './CreateRoom.css'


function CreateRoom() {
  const [showForm, setShowForm] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [selectedIcons, setSelectedIcons] = useState([])
  const navigate = useNavigate()

  const handleCreateRoomSubmit = event => {
    event.preventDefault()

    const target = event.target

    const nameRoom = target.nameRoom.value
    const region = target.region.value
    const city = target.city.value
    const img = target.img.value
    const description = target.description.value
    const services = selectedIcons
    const price = target.price.value
    const availability = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    const coordinates = { lat: parseFloat(target.lat.value), lng: parseFloat(target.lng.value) };

    try {
      logic.createRoom(nameRoom, region, city, img, description, services, price, availability, coordinates)
        .then(() => navigate('/'))
        .catch(error => alert(error.message))

    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <div>
      <Header>
        <TopBar />
      </Header>
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

                <ServicesSelect onSelectionChange={setSelectedIcons} />

                <Field id='price' type='string' placeholder='Precio por noche' />

                <div>
                  <label htmlFor='startDate'>Fecha de Inicio </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat='yyyy-dd-MM'
                  />
                </div>
                <div>
                  <label htmlFor='endDate'>Fecha de Cierre </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat='yyyy-dd-MM'
                  />
                </div>

                <Field id='lat' type='string' placeholder='Latitud' />
                <Field id='lng' type='string' placeholder='Longitud' />
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

//TODO SERVICIOS
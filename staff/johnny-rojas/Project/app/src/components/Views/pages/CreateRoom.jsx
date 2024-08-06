import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../library/TopBar';
import Header from '../core/Header';
import FormWithPanel from '../core/FormWithPanel';
import View from '../core/View';
import SubmitButton from '../core/SubmitButton';
import Field from '../core/Field';
import Title from '../core/Title';
import ServicesSelect from '../library/ServicesSelect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import logic from '../../../logic';

import './CreateRoom.css'


function CreateRoom() {
  const [showForm, setShowForm] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const navigate = useNavigate()

  const handleCreateRoomSubmit = event => {
    event.preventDefault()

    const target = event.target

    const nameRoom = target.nameRoom.value
    const region = target.region.value
    const city = target.city.value
    const img = target.img.value
    const description = target.description.value
    const price = target.price.value
    const availability = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    const coordinates = { lat: parseFloat(target.lat.value), lng: parseFloat(target.lng.value) };

    try {
      logic.createRoom(nameRoom, region, city, img, description, price, availability, coordinates)
        .then(() => navigate('/'))
        .catch(error => alert(error.message))

    } catch (error) {
      alert(error.message)
    }
  }

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Header>
        <TopBar />
      </Header>
      <View>
        {!showForm ? (
          <div className="information-section">
            <Title className='TitleInfo'><strong>Información Importante</strong></Title>
            <div>
              <p>
                Por favor, complete el siguiente formulario para crear una nueva habitación. Antes de comenzar, asegúrese de leer cuidadosamente las instrucciones proporcionadas a continuación para que toda la información sea precisa y esté actualizada.
              </p>
            </div>
            <div>
              <div className='instructions-content'>
                <h3 className='instructions-heading'>1. Nombre de la Habitación</h3>
                <p>
                  En el campo “Nombre de la habitación”, debes ingresar un nombre descriptivo y atractivo para tu oferta de habitación. Algunos ejemplos pueden ser:
                </p>
                <ul className='instructions-list'>
                  <li>Apartamento Familiar</li>
                  <li>Habitación Doble</li>
                  <li>Habitación Suite</li>
                </ul>

                <h3 className='instructions-heading'>2. Región</h3>
                <p>
                  Para determinar la región a la que pertenece tu habitación, puedes guiarte por la siguiente división de regiones:
                </p>
                <ul className='instructions-list'>
                  <li><strong>Región Norte:</strong> Distrito Capital, La Guaira, Miranda, Aragua, Carabobo, Zulia, Falcón, Yaracuy, Dependencias Federales (Los Roques, La Orchila, Isla La Tortuga, y otras islas menores).</li>
                  <li><strong>Región Sur:</strong> Bolívar, Amazonas, Apure.</li>
                  <li><strong>Región Este:</strong> Anzoátegui, Monagas, Sucre, Nueva Esparta, Delta Amacuro, Dependencias Federales (Isla de Aves).</li>
                  <li><strong>Región Oeste:</strong> Táchira, Mérida, Trujillo, Barinas, Lara, Portuguesa, Cojedes, Guárico.</li>
                </ul>

                <h3 className='instructions-heading'>3. Ciudad</h3>
                <p>
                  Para determinar la ubicación en la cual se localiza tu habitación, debes ingresar el nombre del estado y la ciudad:
                </p>
                <ul className='instructions-list'>
                  <li>Anzoátegui, Puerto La Cruz.</li>
                  <li>Bolivar, Cuidad Bolivar</li>
                  <li>Nueva Esparte, El Valle</li>
                </ul>

                <h3 className='instructions-heading'>4. Imagen (Link)</h3>
                <p>
                  Debes proporcionar un enlace a una imagen en formato JPG que comience con “http”. Por ejemplo:
                </p>
                <ul className='instructions-list'>
                  <li>http://example.com/imagen1.jpg</li>
                </ul>

                <h3 className='instructions-heading'>5. Descripción</h3>
                <p>
                  Aquí debes resumir las características principales de la habitación. Ejemplos:
                </p>
                <ul className='instructions-list'>
                  <li>Habitación con cama doble para máximo 2 personas, baño, balcón y cocina.</li>
                  <li>Habitación con 2 literas para máximo 4 personas, sin baño.</li>
                </ul>

                <h3 className='instructions-heading'>6. Servicios</h3>
                <p>
                  Selecciona los servicios que ofrece tu alojamiento. Las opciones disponibles son:
                </p>
                <ul className='instructions-list'>
                  <li>Wifi</li>
                  <li>Estacionamiento</li>
                  <li>Piscina</li>
                  <li>Pet friendly</li>
                  <li>Restaurant</li>
                  <li>Accesibilidad</li>
                  <li>Atención 24/7</li>
                </ul>

                <h3 className='instructions-heading'>7. Precio por Noche</h3>
                <p>
                  Indica el precio por noche junto con la moneda. Ejemplos:
                </p>
                <ul className='instructions-list'>
                  <li>45 USD</li>
                  <li>32 EUR</li>
                  <li>20409 VES</li>
                </ul>

                <h3 className='instructions-heading'>8. Disponibilidad</h3>
                <p>
                  Para seleccionar la disponibilidad, selecione una fecha de inicio y una fecha de cierre.
                </p>

                <h3 className='instructions-heading'>9. Coordenadas (Latitud y Longitud)</h3>
                <p>
                  Para obtener las coordenadas (latitud y longitud) de la ubicación de tu habitación, sigue estos pasos:
                </p>
                <ol className='instructions-list'>
                  <li>Abre Google Maps.</li>
                  <li>Navega hasta la ubicación de tu habitación.</li>
                  <li>Haz clic derecho en la ubicación y selecciona “¿Qué hay aquí?”.</li>
                  <li>En la parte inferior, verás un cuadro con las coordenadas. Copia estas coordenadas.</li>
                </ol>
              </div>
              <button className="show-form-button" onClick={handleShowForm}>
                Ir al Formulario
              </button>
            </div>
          </div>
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

                <ServicesSelect></ServicesSelect>

                <Field id='price' type='string' placeholder='Precio por noche' />
                <div>
                  <label htmlFor='startDate'>Fecha de Inicio </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat='yyyy-MM-dd'
                  />
                </div>
                <div>
                  <label htmlFor='endDate'>Fecha de Cierre </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat='yyyy-MM-dd'
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

//TODO como meter más imagenes min 3 
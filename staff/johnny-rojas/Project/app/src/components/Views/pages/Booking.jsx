import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logic from '../../../logic/index';
import { getUserId } from "../../../logic/getUserInfo";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from "../core/Header";
import TopBar from "../library/TopBar";
import createBooking from '../../../logic/createBooking';
import View from "../core/View";
import Field from "../core/Field";
import Title from "../core/Title";

import './Booking.css'


function Booking() {
  const userId = getUserId();
  const { roomId } = useParams();
  const navigate = useNavigate()

  const [room, setRoom] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    logic.getRoom(userId, roomId)
      .then(roomData => {
        setRoom(roomData);

        logic.getBlockedDatesByRoom(roomId)
          .then(blockedDates => {
            const unavailableDates = blockedDates.map(blockDate => new Date(blockDate))
            setUnavailableDates(unavailableDates)
          })
          .catch(error => {
            console.error(error.message)
          })
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [roomId, userId])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    if (startDate >= endDate) {
      alert("End date must be after start date.");
      return;
    }

    createBooking(userId, roomId, startDate.toISOString(), endDate.toISOString())
      .then(() => {
        alert("Booking created successfully!");
        navigate(`/users/${userId}/bookings/`)
        setStartDate(null);
        setEndDate(null);
      })
      .catch(error => {
        alert(`Error: ${error.message}`);
      });
  };


  if (!room) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header>
        <TopBar />
      </Header>

      <div className="Info">
        <img src={room.image} alt='Room' className='Image' />

        <div className='InfoCard'>
          <div className="InfoCardLeft">
            <p className="nameRoom">{room.nameRoom}</p>
            <p className="city">{room.city}</p>
            <p className="descriptionRoom">{room.description}</p>
          </div>

          <div className="InfoCardRight">
            <div className='Price'>
              <p className="ppn">Precio por noche</p>
              <p className="priceRoom">{room.price}</p>
            </div>
          </div>
          <div className="TitleDates">
            <Title className='SelectDates'>Selecciona tus fechas</Title>
          </div>

          <div className="DateSelect">
            <form onSubmit={handleSubmit}>
              <div className="Calendar">
                <div className="DateRight">
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    minDate={new Date()}
                    excludeDates={unavailableDates}
                    placeholderText="Fecha de inicio"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="DateLeft">
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    minDate={startDate}
                    excludeDates={unavailableDates}
                    placeholderText="Fecha de salida"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              <div className="TitlePayment">
                <Title className='TitlePrincipalPayment'>Realiza tu pago</Title>
              </div>
              <View className='RegisterFormPayment' >

                <Field id='name' type='text' placeholder='Nombre en la tarjeta ' />
                <Field id='text' type='text' placeholder='Nº de tarjeta' />
                <Field id='text' type='text' placeholder='Caducidad' />
                <Field id='photextne' type='text' placeholder='CCV' />

                <button type="submit">Create Booking</button>
              </View>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;

//TODO MEJORAR EL PAGO con validaciones ¿hacer un modelo de payment? 
//TODO Alert de confirmacion Con estilos
//TODO que te lleve al invoice(FACTURA) Que te lleve a una pagina que puedas ver los detalles detu alojamiento
//TODO No se marcan los dias no disponibles En el calendario los dias no disponibles no se ponen opacos REPASAR
//TODO Cuando no eres usuario que te salga un alert

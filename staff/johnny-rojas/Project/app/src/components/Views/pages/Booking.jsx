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

        logic.getBlockedDatesByRoomId(roomId)
          .then(blockedDates => {
            const dates = blockedDates.flatMap(booking => {
              return getAllDatesBetween(booking.startDate, booking.endDate);
            });
            setUnavailableDates(dates);
      })
      .catch(error => {
        console.error(error.message);
      });
  })
    .catch(error => {
      console.error(error.message);
    });
}, [roomId, userId]);

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
      navigate('/users/:userId/booking-invoice/')
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

    <img src={room.image} alt='Room' className='Image' />

    <div className="Img">
    </div>

    <div className='InfoCard'>
      <div className="InfoCardLeft">
        <p className="nameRoom">{room.nameRoom}</p>
        <p className="city">{room.city}</p>
        <p className="descriptionRoom">{room.description}</p>
      </div>

      <div className="DateSelect">
        <form onSubmit={handleSubmit}>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            minDate={new Date()}
            excludeDates={unavailableDates}
            placeholderText="Selecciona inicio"
            dateFormat="dd/MM/yyyy"
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            minDate={startDate}
            excludeDates={unavailableDates}
            placeholderText="Selecciona final"
            dateFormat="dd/MM/yyyy"
          />
          <View className='RegisterForm' tag='main'>
            <Title className='TitlePrincipalRegister'>Realiza tu pago</Title>

            <Field id='email' type='email' placeholder='Email' />
            <Field id='name' type='text' placeholder='Nombre ' />
            <Field id='text' type='text' placeholder='Nº de tarjeta' />
            <Field id='text' type='text' placeholder='Caducidad' />
            <Field id='photextne' type='text' placeholder='CCV' />

            <button type="submit">Create Booking</button>
          </View>

        </form>
      </div>

      <div className="InfoCardRight">
        <div className='Price'>
          <p className="ppn">Precio por noche</p>
          <p className="priceRoom">{room.price}</p>
        </div>
      </div>
    </div>
  </div>
);
}

export default Booking;
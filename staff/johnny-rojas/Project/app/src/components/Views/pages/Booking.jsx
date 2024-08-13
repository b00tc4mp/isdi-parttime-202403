import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logic from '../../../logic/index';
import { getUserId } from "../../../logic/getUserInfo";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from "../core/Header";
import TopBar from "../library/TopBar";
import createBooking from '../../../logic/createBooking'; 


function Booking() {
  const userId = getUserId();
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    logic.getRoom(userId, roomId)
      .then(roomData => {
        setRoom(roomData);

        logic.getBlockedDatesByRoomId(roomId)
          .then(bookings => {
            const blockedDates = bookings.flatMap(booking => {
              const dates = [];
              let currentDate = new Date(booking.startDate);
              const endDate = new Date(booking.endDate);
              while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
              }
              return dates;
            });
            setUnavailableDates(blockedDates);
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
      alert("please select both start and end dates.");
      return;
    }

    if (startDate >= endDate) {
      alert("end date must be after start date.");
      return;
    }

    createBooking(userId, roomId, startDate.toISOString(), endDate.toISOString())
      .then(() => {
        alert("Booking created successfully!");
        setStartDate(null);
        setEndDate(null);
      })
      .catch(error => {
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <Header>
        <TopBar />
      </Header>

      <article className="CardRoom">
        <div className='Img'>
          <img src={room?.image} alt={room?.nameRoom} />
        </div>
        <div className="InfoCardLeft">
          <p className="nameRoom">{room?.nameRoom}</p>
          <p className="regionRoom">{room?.region}</p>
          <p className="descriptionRoom">{room?.description}</p>
        </div>
        <div className='InfoCardRight'>
          <div>
            <p className="likeRoom">{room?.like}</p>
          </div>
          <div className='Price'>
            <p className="ppp">Precio por noche</p>
            <p className="priceRoom">{room?.price}</p>
          </div>
          <div className="DateSelect">
            <form onSubmit={handleSubmit}>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                minDate={new Date()}
                excludeDates={unavailableDates}
                placeholderText="Selecciona inico de estadia"
                dateFormat="yyyy/MM/dd"
              />
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                minDate={startDate}
                excludeDates={unavailableDates}
                placeholderText="Selecciona final de estadia"
                dateFormat="yyyy/MM/dd"
              />
              <button type="submit">
                Create Booking
              </button>
            </form>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Booking;
import { useEffect, useState } from "react"
import logic from '../../../logic/index'
import { getUserId } from "../../../logic/getUserInfo"
import Header from "../core/Header"
import TopBar from "../library/TopBar"


function GuestBookings() {
  const userId = getUserId()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    try {
      logic.getAllBookingsByGuest(userId)
        .then((bookings) => { setBookings(bookings) })
        .catch(error => {
          alert(error.message)
          return
        })
    } catch (error) {
      console.error(error.message)
      alert(error.message)
    }
  }, [userId])

  return (<div>
    <div>
      <Header>
        <TopBar />
      </Header>
    </div>
    <div className="containerImg">
      <section className="sectionCard">
        <h2 className="sectionTitle">Reservas</h2>
        <div className="bookingListContainer">
          <ul className="gridList" key={bookings.id}>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <li className="bookingItem" key={booking.id}>
                  <p className="contactInfoTitle">Información de reserva:</p>
                  <img className="imagen" src={booking.room.image} />
                  <p><span className="infoLabel">Anfitrión:</span> {booking.room.manager.name}</p>
                  <p><span className="infoLabel">Email:</span> {booking.room.manager.email}</p>
                  <p><span className="infoLabel">Teléfono:</span> {booking.room.manager.phone}</p>
                  <p><span className="infoLabel">Entrada:</span> {new Date(booking.startDate).toLocaleDateString()}</p>
                  <p><span className="infoLabel">Salida:</span> {new Date(booking.endDate).toLocaleDateString()}</p>
                  <p><span className="infoLabel">Estatus:</span> {booking.isBlocked ? 'Cancelado' : 'Confirmado'}</p>
                </li>
              ))
            ) : (
              <p>No hemos encontrado reservas.</p>
            )}
          </ul>
        </div>
      </section>
    </div>
  </div>)
}

export default GuestBookings
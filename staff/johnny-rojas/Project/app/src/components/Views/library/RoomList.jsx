import { useState, useEffect } from "react";
import logic from "../../../logic/index";
import { Link, useNavigate } from "react-router-dom";

import './RoomList.css'

function RoomList() {
  const [rooms, setRooms] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoggedIn(logic.isUserLoggedIn());
  }, [])

  useEffect(() => {
    try {
      logic.getAllRooms()
        .then((rooms) => { setRooms(rooms) })
        .catch(error => {
          alert(error.message)
          return
        })

    } catch (error) {
      console.error(error.message)
      alert(error)
    }
  }, [])

  const handleReserveClick = (roomId) => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      navigate(`/create-booking/${roomId}`)

    }
  }

  return <div className='Container'>
    <section className='SectionCard'>
      <ul className="Grid">
        {rooms.map(room => <li className='Card' key={room.id}>
          <div className="Img">
            <img src={room.image} alt='ImgRoom' className='Image' />
          </div>
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
            <div className="LinkTo">
              <button onClick={() => handleReserveClick(room.id)}>
                Reservar
              </button>
            </div>
          </div>
        </li>)}
      </ul>
    </section>
  </div>

}

export default RoomList
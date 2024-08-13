import { useState, useEffect } from "react";
import logic from "../../../logic/index";
import { Link } from "react-router-dom";

import './RoomList.css'

function RoomList() {
  const [rooms, setRooms] = useState([])

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
              <Link to={`/create-booking/${room.id}`}>Reservar</Link>
            </div>
          </div>
        </li>)}
      </ul>
    </section>
  </div>

}

export default RoomList
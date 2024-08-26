import { useState, useEffect } from "react"
import logic from "../../../logic/index"
import { useNavigate } from "react-router-dom"
import SearchBar from "../library/SearchBar" // Importar SearchBar

import './RoomList.css'

function RoomList() {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([]) 
  const [searchQuery, setSearchQuery] = useState('') 
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoggedIn(logic.isUserLoggedIn())
  }, [])

  useEffect(() => {
    try {
      logic.getAllRooms()
        .then((rooms) => { 
          setRooms(rooms)
          setFilteredRooms(rooms) 
        })
        .catch(error => {
          alert(error.message)
          return
        })
    } catch (error) {
      console.error(error.message)
      alert(error)
    }
  }, [])

  useEffect(() => {
  
    setFilteredRooms(
      rooms.filter(room => 
        room.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
        room.nameRoom.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [searchQuery, rooms])

  const handleReserveClick = (roomId) => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      navigate(`/create-booking/${roomId}`)
    }
  }

  const handlerSearch = (query) => {
    setSearchQuery(query)
  }

  return (
    <div className='Container'>
      <SearchBar onSearch={handlerSearch} /> 
      <section className='SectionCard'>
        <ul className="Grid">
          {filteredRooms.map(room => ( 
            <li className='Card' key={room.id}>
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
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default RoomList
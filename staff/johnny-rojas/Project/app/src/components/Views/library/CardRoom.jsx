import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import logic from '../../../logic/index';
import Image from '../core/Image';



function CardRoom({ Room }) {
  const { roomId } = useParams()
  const [room, setRoom] = useState(null)

  useEffect(() => {
    try {
      logic.getRoom(roomId)
        .then((room) => { setRoom(room) })
        .catch(error => {
          alert(error.message)

          return
        })

    } catch (error) {
      console.error(error)
      alert(error.message)
    }
  })


  return <article className="CardRoom">
    <div className='Img'>
      <Image src={Room.image}></Image>
    </div>
    <div className="InfoCardLeft">
      <p className="nameRoom">{Room.nameRoom}</p>
      <p className="regionRoom">{Room.region}</p>
      <p className="descriptionRoom">{Room.description}</p>
      <p className="availabilityRoom">{Room.availibility}</p>
    </div>
    <div className='InfoCardRight'>
      <div>
        <p className="likeRoom">{Room.like}</p>
      </div>
      <div className='Price'>
        <p className="ppp">Precio por noche</p>
        <p className="priceRoom">{Room.price}</p>
      </div>
    </div>
    <div className='leaflet'>
      //coordinates leaflet
    </div>
    <div className='infoContact'>
      <p>{Room.contact}</p>
    </div>
  </article>

}

export default CardRoom

//TODO
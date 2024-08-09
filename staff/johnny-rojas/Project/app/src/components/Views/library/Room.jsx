import { useEffect, useState } from "react"
import logic from "../../../logic/index"

function Room() {
  const [room, setRoom] = useState
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    try {
      logic.getRoom()
        .then((room) => { setRoom(room) })
        .catch(error => {
          alert(error.message)
        })

    } catch (error) {
      console.error(error.message)
      alert(error)

    }
  }, [])

  return <div className="RoomSelected">
    {room.map(room => <div>
      <img src={room.image} alt='ImgRoom' className='Image' />
    </div>
      
      
    
    
    )}
  </div>
}

export default Room
import { useEffect, useState } from "react"
import logic from '../../../logic/index'
import { useParams } from "react-router-dom"
import { getUserId } from "../../../logic/getUserInfo";

function Booking() {
  const { roomId } = useParams()
  const [room, setRoom] = useState(null)

  const userId = getUserId()

  useEffect(() => {
    try {
      logic.getRoom(userId, roomId)
        .then((room) => { setRoom(room) })
        .catch(error => {
          alert(error.message)
          return 
        })

    } catch (error) {
      alert(error.message)
    }
  }, [])




  return <div>
    <img src={room.image}/>
    
  </div>
}

export default Booking
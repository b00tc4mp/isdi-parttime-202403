import { useEffect, useState } from "react";

function HostRooms() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    try {
      logic.getAllRoom(userId)
      .then((rooms) => {setRooms})
      
    } catch (erro) {
      console.error(error.message)
      alert(error)
    }
  })
}
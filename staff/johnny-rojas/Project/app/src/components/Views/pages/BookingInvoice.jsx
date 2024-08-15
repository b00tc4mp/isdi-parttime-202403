import { useState } from "react";
import TopBar from "../library/TopBar";
import Headers from "../core/Header";

function BookingInvoice(){
  const [userId, setUserId] = useState()
  const [roomId, setRoomId] = useState()
  const [bookingId, setBookingId] = useState()

  return <di>
    <div>
      <Headers>
        <TopBar></TopBar>
      </Headers>
    </div>
  </di>
}
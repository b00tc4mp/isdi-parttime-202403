import 'dotenv/config'
import mongoose from 'mongoose'

import createRoom from './createRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createRoom('66ad452a27f4840c9c068165', 'RoomName', 'Norte', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg', 'Habitación doble para 2 personas', '3000 VES', 'disponible', [], [-73.97, 40.77])
        .then(() => console.log('room created'))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))
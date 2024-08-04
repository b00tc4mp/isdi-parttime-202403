import 'dotenv/config'
import mongoose from 'mongoose'
import { User } from '../data/index.js'

import createRoom from './createRoom.js'
import { NotFoundError } from 'com/errors.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)

const userId = '66acf8a315e545a4d2f06a3b'

User.findById(userId)
  .then(user => {
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const contact = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone
    };


    return createRoom(userId, 'RoomName', 'Norte', 'https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg', 'Habitación doble para 2 personas', '3000 VES', 'Disponible', [], [-63.90, 40.76])
    .then(({ room }) => console.log('Room:', room))
      .catch(error => console.error(error))
  })

  .catch(error => console.error(error))
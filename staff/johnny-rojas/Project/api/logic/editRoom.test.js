import 'dotenv/config'
import mongoose from 'mongoose'

import editRoom from './editRoom.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      editRoom('66b76351c316c71376f20b2f','66b873ff2e268693ac537cf8',
        {
          nameRoom: 'Manuel house',
          region: 'Norte',
          city: 'Carabobo, Valencia',
          url: 'https://images.unsplash.com/photo-1588557132645-ff567110cafd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg',
          description: 'New home',
          price: '1 EUR'
        }
      )
        .then(() => {
          console.log('room edited')
        })
        .catch((error) => console.log(error.message))

    } catch (error) {
      console.error(error.message)
    }
  })
  .catch(error => console.log(error.message))
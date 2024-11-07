import 'dotenv/config'

import mongoose from 'mongoose'
import getArtistsByCity from '../getArtistsByCity.js'

const { MONGODB_URL } = process.env
console.log('MongoDB URL:', MONGODB_URL)

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB')

    getArtistsByCity('Barcelona', 'mago')
      .then((artistsList) => {
        console.log('Artists retrieved:', artistsList)
      })
      .catch((error) => {
        console.error('Error retrieving artists:', error)
      })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

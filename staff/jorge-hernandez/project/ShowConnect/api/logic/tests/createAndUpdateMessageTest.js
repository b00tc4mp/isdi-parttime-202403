import 'dotenv/config'
import mongoose from 'mongoose'

import createAndUpdateMessage from '../createAndUpdateMessage.js'
import logic from '../index.js'

const { MONGODB_URL } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    createAndUpdateMessage(
      '66c11633fd294992b414b07e',
      '66c11633fd294992b414b07c',
      'hola caracola'
    )
      .then((message) => {
        return logic.updateChatWithMessage(
          '66c11633fd294992b414b07e',
          message._id
        )
      })
      .then(() => {
        console.log('Message created and chat updated successfully')
      })
      .catch((error) => {
        console.error('Error during message creation or chat update:', error)
      })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

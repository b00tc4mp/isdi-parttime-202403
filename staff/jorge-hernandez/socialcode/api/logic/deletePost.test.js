import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    try {
      deletePost('6689014036c5ff836afc8eb2', '6690be4b3330324dc75d12d5')
        .then((post) => console.log('post deleted'))
        .catch((error) => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))

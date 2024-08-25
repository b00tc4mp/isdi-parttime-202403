import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL_TEST } = process.env

export const connectDB = () => {
  if (mongoose.connection.readyState === 0) {
    return mongoose.connect(MONGODB_URL_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  return Promise.resolve()
}

export const disconnectDB = () => {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
  return Promise.resolve()
}

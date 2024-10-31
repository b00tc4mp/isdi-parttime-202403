import 'dotenv/config'
import mongoose from 'mongoose'
import updateAppointment from './updateAppointment.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateAppointment('66cb8d3d9e334b57ce1f9966', '66cf2884c31e683ae3982a69', { service: '66cb9f5cf06937d8e7c46659', date: '2028-01-01', time: '10:00', status: 'pending' })
                .then(() => console.log('appointment updated'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })

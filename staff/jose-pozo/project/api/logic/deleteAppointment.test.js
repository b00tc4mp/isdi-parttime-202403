import 'dotenv/config'
import mongoose from 'mongoose'
import deleteAppointment from './deleteAppointment.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteAppointment('66cb8d3d9e334b57ce1f9966', '66cf2884c31e683ae3982a69')
                .then((user) => console.log('appointment deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


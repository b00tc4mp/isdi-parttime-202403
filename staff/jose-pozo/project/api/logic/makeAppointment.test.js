import 'dotenv/config'
import mongoose from 'mongoose'


import makeAppointment from './makeAppointment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            makeAppointment('66d2fd4593cac8027dc4033e', '66d2fd6793cac8027dc4034d', '66d2fd8e93cac8027dc4035b', '2024-09-02', '22:00', 'confirmed')

                .then(() => console.log('appointment made'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
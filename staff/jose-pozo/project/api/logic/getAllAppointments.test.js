import 'dotenv/config'
import mongoose from 'mongoose'

import getAllAppointments from './getAllAppointments.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllAppointments('66d2fd4593cac8027dc4033e')
                .then(appointments => console.log('appointments retrieved', appointments))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
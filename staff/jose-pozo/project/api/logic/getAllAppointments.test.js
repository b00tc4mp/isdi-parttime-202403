import 'dotenv/config'
import mongoose from 'mongoose'

import getAllAppointments from './getAllAppointments.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllAppointments('66cb8d3d9e334b57ce1f9966')
                .then(appointments => console.log('appointments retrieved', appointments))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
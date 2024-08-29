import 'dotenv/config'
import mongoose from 'mongoose'
import registerAdmin from './registerAdmin.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerAdmin('carla', 'casaUno', 'carla@email.com', '1234', '1234', 'avatars/.jpg', 'familyOne')
                .then(() => {
                    console.log('User Created')
                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
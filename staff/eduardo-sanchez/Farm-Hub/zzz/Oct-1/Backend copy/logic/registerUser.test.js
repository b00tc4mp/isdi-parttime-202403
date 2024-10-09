import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser('Lolo', 'Bolo', 'lolo@bolo.com', 'lolobolo', '123123123', '123123123',)
                // registerUser('Ramo', 'Nin', 'ramo@nin.com', 'ramonin', 'Hola1234', 'Hola1234')
                .then(() => console.log('User registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


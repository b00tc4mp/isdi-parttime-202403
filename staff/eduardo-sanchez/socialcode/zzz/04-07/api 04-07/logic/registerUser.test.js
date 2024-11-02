import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            // registerUser('Pepi', 'Nillo', 'pepi@nillo.com', 'pepinillo', '123123123', '123123123', error => {
            registerUser('Lolo', 'Bolo', 'lolo@bolo.com', 'lolobolo', '123123123', '123123123', error => {
                // registerUser('Ramo', 'Nin', 'ramo@nin.com', 'ramonin', 'Hola1234', 'Hola1234', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user registered')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

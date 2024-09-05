import 'dotenv/config'
import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            authenticateUser('ramonin', 'Hola1234', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user authenticated')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

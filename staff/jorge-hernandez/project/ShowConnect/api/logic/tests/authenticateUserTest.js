import 'dotenv/config'
import mongoose from 'mongoose'

import authenticateUser from './authenticateUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            authenticateUser('jorge@moreno.com', '123')
                .then(() => console.log('user logged'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


import 'dotenv/config'
import mongoose from 'mongoose'

import updateUsername from './updateUsername.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateUsername('66cad15de2e0f70ae070925a', 'huguito')
                .then(() => console.log('username edited'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
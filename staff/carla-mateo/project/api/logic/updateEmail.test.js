import 'dotenv/config'
import mongoose from 'mongoose'

import updateEmail from './updateEmail.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateEmail('66cad15de2e0f70ae070925a', 'hugo@example.com')
                .then(() => console.log('email edited'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
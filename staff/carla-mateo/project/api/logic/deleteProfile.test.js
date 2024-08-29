import 'dotenv/config'
import mongoose from 'mongoose'

import deleteProfile from './deleteProfile.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteProfile('66cad15de2e0f70ae070925a')
                .then(() => { })
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
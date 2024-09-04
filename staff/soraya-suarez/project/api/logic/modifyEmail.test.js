import 'dotenv/config'
import mongoose from 'mongoose'

import modifyEmail from './modifyEmail.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyEmail('66c1b645fe842c9b2769c0c8', 'soraya@suarez.com')
                .then(() => console.log('updated email of user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
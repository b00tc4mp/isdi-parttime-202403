import 'dotenv/config'
import mongoose from 'mongoose'

import getAllServices from './getAllServices.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllServices('66c89602041ae8e5a3cbc5c4')
                .then(services => console.log('services retrieved', services))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
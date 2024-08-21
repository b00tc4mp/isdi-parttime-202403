import 'dotenv/config'
import mongoose from 'mongoose'

import updateCustomer from './updateCustomer.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateCustomer('66c22fff698c8a8604ee561a', '66c4865d822a5cbdc12afc6d', {
                name: 'Manda', surname: 'Carallo', email: 'manda@carallo.com', phone: '+34 6999 000 000'
            })
                .then((user) => console.log('user updated', user))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
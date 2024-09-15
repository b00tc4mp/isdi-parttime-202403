import 'dotenv/config'
import mongoose from 'mongoose'

import createCustomer from './createCustomer.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createCustomer('66c22fff698c8a8604ee561a', 'Empa', 'Nadilla', 'empa@nadilla.com')

                .then(() => console.log('customer registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
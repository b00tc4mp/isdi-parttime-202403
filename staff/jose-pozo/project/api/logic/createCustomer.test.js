import 'dotenv/config'
import mongoose from 'mongoose'

import createCustomer from './createCustomer.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createCustomer('66b3a6d7478462d12028066f', 'Empa', 'Nada', 'empa@nada.com')

                .then(() => console.log('customer registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
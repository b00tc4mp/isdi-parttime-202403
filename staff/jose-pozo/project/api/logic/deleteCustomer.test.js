import 'dotenv/config'
import mongoose from 'mongoose'

import deleteCustomer from './deleteCustomer.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteCustomer('66c22fff698c8a8604ee561a', '66c2305a698c8a8604ee5629')
                .then((user) => console.log('user deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

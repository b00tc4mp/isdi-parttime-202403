import 'dotenv/config'
import mongoose from 'mongoose'

import getAllCustomers from './getAllCustomers.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllCustomers('66c89602041ae8e5a3cbc5c4')
                .then(customers => console.log('customers retrieved', customers))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
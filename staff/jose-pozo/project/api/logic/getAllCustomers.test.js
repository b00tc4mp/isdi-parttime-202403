import 'dotenv/config'
import mongoose from 'mongoose'

import getAllCustomers from './getAllCustomers.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllCustomers('66b3a6d7478462d12028066f')
                .then(customers => console.log('customers retrieved', customers))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
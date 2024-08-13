// debugger

import 'dotenv/config'
import mongoose from 'mongoose'

import deleteCustomer from './deleteCustomer.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteCustomer('66bbbccf0eacbc11ec4c6289', '66bbbd380eacbc11ec4c628f')
                .then((user) => console.log('user deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

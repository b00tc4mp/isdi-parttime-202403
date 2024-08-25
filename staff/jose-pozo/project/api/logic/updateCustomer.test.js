import 'dotenv/config'
import mongoose from 'mongoose'

import updateCustomer from './updateCustomer.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateCustomer('66c89602041ae8e5a3cbc5c4', '66c89602041ae8e5a3cbc5c4', {
                name: 'Manda', surname: 'Carallo', email: 'manda@carallo.com', phone: '+34 6999 000 000'
            })
                .then((user) => console.log('user updated'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
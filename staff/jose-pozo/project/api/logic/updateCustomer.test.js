import 'dotenv/config'
import mongoose from 'mongoose'

import updateCustomer from './updateCustomer.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateCustomer('66cb8d3d9e334b57ce1f9966', '66cba842f06937d8e7c466dd', {
                name: 'Manda', surname: 'Carallo', email: 'manda@carallo.com', phone: '+34 6999 000 000'
            })
                .then((user) => console.log('user updated'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
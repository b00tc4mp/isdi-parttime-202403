import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('668bb1b3a8796a3c7044e7ca', '668bb1b3a8796a3c7044e7ca')
                .then(name => console.log('user name retrieved', name))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
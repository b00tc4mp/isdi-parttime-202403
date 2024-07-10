import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('668e306b09971635b862a3ef', '668e306b09971635b862a3ef')
                .then((name) => console.log('user name retrieved', name))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
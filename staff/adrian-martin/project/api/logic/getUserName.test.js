import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('66a9e32f031b287a5e80a77a', '66a9e33d6fc36f64e9967e22')
                .then(username => console.log('username retrieved', username))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
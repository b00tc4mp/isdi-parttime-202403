import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from '../getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('66a37a3286c988c8d4dd8b90', '66a37a3286c988c8d4dd8b90')
                .then(name => console.log('user name retrieved', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('668eb8ea62f11ed73a08ffdd', '668c1d9df27ad1f0e5f0b86a')
                .then(name => console.log('user name retrieved', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
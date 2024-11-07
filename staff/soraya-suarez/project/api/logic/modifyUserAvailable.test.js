import 'dotenv/config'
import mongoose from 'mongoose'

import modifyUserStatus from './modifyUserStatus.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyUserStatus('66b4bdcc64ab6e0c4cc166ce', '66b4beb41e06a1273359a174', false)
                .then(() => console.log('updated user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
import 'dotenv/config'
import mongoose from 'mongoose'

import toggleDoneTask from './toggleDoneTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleDoneTask('66c98728e8d42c5310e007bf', '66c97ba4e8d42c5310e00751')
                .then(() => console.log('user toggled done'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
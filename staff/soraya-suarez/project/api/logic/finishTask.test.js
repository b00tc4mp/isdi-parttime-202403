import 'dotenv/config'
import mongoose from 'mongoose'

import finishTask from './finishTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            finishTask('66c1b645fe842c9b2769c0c8', '66c1b91ee26e609fa3926db9', 3)
                .then(() => console.log('updated user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
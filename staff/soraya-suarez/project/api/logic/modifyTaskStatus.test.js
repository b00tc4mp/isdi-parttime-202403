import 'dotenv/config'
import mongoose from 'mongoose'

import modifyTaskStatus from './modifyTaskStatus.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyTaskStatus('66c1b645fe842c9b2769c0c8', '66e085752254d5f71520ba3a', 'canceled')
                .then(() => console.log('updated task status'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
import 'dotenv/config'
import mongoose from 'mongoose'

import modifyTaskVisible from './modifyTaskVisible.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyTaskVisible('66c1b645fe842c9b2769c0c8', '66e311815e1fc237c2c1b0ae', true)
                .then(() => console.log('updated task visible'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
import 'dotenv/config'
import mongoose from 'mongoose'

import modifyTaskName from './modifyTaskName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyTaskName('66c1b645fe842c9b2769c0c8', '66d5e76db232864866cf3bb1', 'Probando')
                .then(() => console.log('updated task name'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
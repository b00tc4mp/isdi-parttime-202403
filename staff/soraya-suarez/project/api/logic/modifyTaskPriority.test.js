import 'dotenv/config'
import mongoose from 'mongoose'

import modifyTaskPriority from './modifyTaskPriority.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyTaskPriority('66c1b645fe842c9b2769c0c8', '66d5e76db232864866cf3bb1', 'medium')
                .then(() => console.log('updated task priority'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
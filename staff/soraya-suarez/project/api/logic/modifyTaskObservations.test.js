import 'dotenv/config'
import mongoose from 'mongoose'

import modifyTaskObservations from './modifyTaskObservations.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyTaskObservations('66c1b645fe842c9b2769c0c8', '66e085752254d5f71520ba3a', 'observandito')
                .then(() => console.log('updated task observations'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
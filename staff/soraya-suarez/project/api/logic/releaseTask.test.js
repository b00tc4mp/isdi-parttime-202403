import 'dotenv/config'
import mongoose from 'mongoose'

import releaseTask from './releaseTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            releaseTask('66c1b645fe842c9b2769c0c8', '66c472ff11551d20f14b8e63', 'No podía resolverla')
                .then(() => console.log('updated user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
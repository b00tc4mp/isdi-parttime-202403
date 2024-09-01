import 'dotenv/config'
import mongoose from 'mongoose'

import getAllPostComments from './getAllPostComments.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllPostComments('668bf54adbd99627ab1dc276', '668c05aacd82c342f0d9040f')
                .then(() => console.log('comments retrieved', comments))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
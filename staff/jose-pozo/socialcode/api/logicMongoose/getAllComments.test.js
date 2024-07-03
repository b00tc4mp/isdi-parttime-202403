import 'dotenv/config'
import mongoose from 'mongoose'

import getAllComments from './getAllComments.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllComments('DaenerysTargaryen', '668498c1816188d7c642eeec', (error, comments) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('comments retrieved', comments)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
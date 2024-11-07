import 'dotenv/config'
import mongoose from 'mongoose'

import getMyName from './getMyName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getMyName('66c1b645fe842c9b2769c0c8', (error, name) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user name retrieved', name)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
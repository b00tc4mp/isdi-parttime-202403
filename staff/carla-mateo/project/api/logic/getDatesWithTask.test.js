import 'dotenv/config'
import mongoose from 'mongoose'

import getDatesWithTask from './getDatesWithTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getDatesWithTask('66cac64f1a6f21d24cea6147', new Date())
                .then((dates) => {
                    console.log(dates)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
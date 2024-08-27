import 'dotenv/config'
import mongoose from 'mongoose'

import getDayWithTask from './getDayWithTask.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getDayWithTask('66cac64f1a6f21d24cea6147')
                .then((family) => {
                    console.log(family)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
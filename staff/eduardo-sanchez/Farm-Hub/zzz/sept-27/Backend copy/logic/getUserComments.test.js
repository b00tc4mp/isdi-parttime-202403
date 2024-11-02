import 'dotenv/config'
import mongoose from 'mongoose'

import getUserComments from './getUserComments.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            getUserComments('66e4879730cb63f97bbc23e5')
                .then(ads => console.log(JSON.stringify(ads, null, 2)))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


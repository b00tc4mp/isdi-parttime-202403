import 'dotenv/config'
import mongoose from 'mongoose'

import getUserComments from './getUserComments.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            getUserComments('66ae6370f11082ed7f0623dd')
                .then(ads => console.log(JSON.stringify(ads, null, 2)))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


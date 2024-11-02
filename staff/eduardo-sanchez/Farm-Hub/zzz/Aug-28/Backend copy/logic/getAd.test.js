import 'dotenv/config'
import mongoose from 'mongoose'

import getAd from './getAd.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAd('66b5d606e5d01c787f942e9f')
                .then(ad => console.log('ad retrieved', ad))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
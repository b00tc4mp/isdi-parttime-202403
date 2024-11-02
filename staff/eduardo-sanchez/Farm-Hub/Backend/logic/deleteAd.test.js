import 'dotenv/config'
import mongoose from 'mongoose'

import deleteAd from './deleteAd.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteAd('66ae6370f11082ed7f0623dd', '66b79bc6dafba1f6b34c592f')
                .then(() => console.log('ad deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
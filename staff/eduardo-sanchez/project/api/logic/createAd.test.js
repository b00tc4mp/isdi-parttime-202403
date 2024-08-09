import 'dotenv/config'
import mongoose from 'mongoose'

import createAd from './createAd.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createAd('66a939ddca799581a845711c', 'tomates', 'tomates de ensalada', '3.20 €/Kg')
                .then(() => console.log('Ad created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))



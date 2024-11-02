import 'dotenv/config'
import mongoose from 'mongoose'

import updateAd from './updateAd.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateAd('66c0e163c89ecaf42d52a2f9', '66d1af99798fbae9e3ce4414', 'melocotones', 'CALANDRA', '3.10 €/Kg')
                .then(() => console.log('ad updated'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
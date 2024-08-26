import mongoose from 'mongoose'
import 'dotenv/config'
import createOrderSentence from './createOrderSentence.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createOrderSentence('66a94dcb34505782bcd8cfd0', '66c49703e8fbc188b5db0e7d', 'alan hat es gegessen')
                .then(() => console.log('exercise created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
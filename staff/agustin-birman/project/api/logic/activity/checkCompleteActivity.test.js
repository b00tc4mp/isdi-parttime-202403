import mongoose from 'mongoose'
import 'dotenv/config'
import checkCompleteActivity from './checkCompleteActivity.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            checkCompleteActivity('66a94dcb34505782bcd8cfd0', '66c1fbba04735a9cfdd94859')
                .then((result) => console.log('actvity completed', result))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
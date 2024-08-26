import 'dotenv/config'
import mongoose from 'mongoose'
import submitAnswer from './submitAnswer.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            submitAnswer('66a94dcb34505782bcd8cfd0', '66b1cdc7debd28877917c736', 'hat')
                .then(() => console.log('answer submitted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
import deleteAnswers from './deleteAnswers.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteAnswers('66a94dcb34505782bcd8cfd0', '66afc3b7f25abf38240bc9ac')
                .then(() => console.log('answers deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
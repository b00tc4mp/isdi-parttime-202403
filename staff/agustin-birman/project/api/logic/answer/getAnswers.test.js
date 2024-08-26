import mongoose from 'mongoose'
import 'dotenv/config'
import getAnswers from './getAnswers.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAnswers('66a94dcb34505782bcd8cfd0', '66b3aa771e8b00799a51db9a', 'hat')
                .then(answers => console.log(answers))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

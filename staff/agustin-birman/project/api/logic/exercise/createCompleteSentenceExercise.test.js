import mongoose from 'mongoose'
import 'dotenv/config'
import createCompleteSentenceExercise from './createCompleteSentenceExercise.js'
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createCompleteSentenceExercise('66a94dcb34505782bcd8cfd0', '66afc3b7f25abf38240bc9ac', 'alan (hat) es gegessen')
                .then(() => console.log('exercise created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
import mongoose from 'mongoose'
import 'dotenv/config'
import deleteExercise from './deleteExercise.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteExercise('66a94dcb34505782bcd8cfd0', '66b259c0ec1e53453e51a4be')
                .then(() => console.log('exercise deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
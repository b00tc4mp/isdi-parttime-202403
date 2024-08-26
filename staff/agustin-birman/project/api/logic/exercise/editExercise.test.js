
import mongoose from 'mongoose'

import 'dotenv/config'
import editExercise from './editExercise.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            editExercise('66a94dcb34505782bcd8cfd0', '66b259e1ec1e53453e51a4ce', 'alex (eats) bananaaaaa')
                .then(() => console.log('actvity edited'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
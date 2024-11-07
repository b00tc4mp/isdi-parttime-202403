import 'dotenv/config'
import mongoose from 'mongoose'
import getAllTasks from './getAllTasks.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllTasks('66be3bfaa0b65ba9d332f68e')
                .then((parent) => {
                    console.log(parent)
                })
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
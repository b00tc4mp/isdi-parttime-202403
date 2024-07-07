import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {

            // registerUser('Peter', 'Pan', 'peter@pan.com', 'peterpan', '123123123', '123123123', error => {
            registerUser('Ramo', 'Nin', 'ramo@nin.com', 'ramonin', 'Hola1234', 'Hola1234', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user registered')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

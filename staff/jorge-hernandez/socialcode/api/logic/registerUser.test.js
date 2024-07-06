import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            //logic.registerUser('Jorge', 'Moreno', 'jorge@moreno.com', 'peterpan', '123123123', '123123123', error => {
            registerUser('Jorge', 'Moreno', 'jorge@moreno.com', 'Jorge', '123123123', '123123123', error => {
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

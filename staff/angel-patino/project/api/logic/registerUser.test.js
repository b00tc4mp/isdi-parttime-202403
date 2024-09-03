import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            //registerUser('Peter', 'Pan', 'peter@pan.com', 'peterpan', '123123123', '123123123', error => {
            //registerUser('Angel', 'Pan', 'angel@pat.com', 'angelpat', '123123123', '123123123', error => {    
            registerUser('Lola', 'lolita', 'lola@lolita.com', 'lolalolita', '12345678', '12345678', error => {
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

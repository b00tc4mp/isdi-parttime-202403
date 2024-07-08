import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(connection => {
        try {
            logic.registerUser('Jack', 'Sparrow', 'jack@sparrow.com', 'JackSparrow', '1234', '1234', error => {
                //registerUser('Jon', 'Snow', 'jon@snow.com', 'JonSnow', '1234', '1234', error => {
                //registerUser('Daenerys', 'Targaryen', 'daenerys@targaryen.com', 'DaenerysTargaryen', '1234', '1234', error => {
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


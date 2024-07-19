import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(connection => {
        try {
            registerUser('Baby', 'Yoda', 'baby@yoda.com', 'BabyYoda', '1234', '1234')
                //registerUser('Jon', 'Snow', 'jon@snow.com', 'JonSnow', '1234', '1234', error => {
                //registerUser('Daenerys', 'Targaryen', 'daenerys@targaryen.com', 'DaenerysTargaryen', '1234', '1234', error => {
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


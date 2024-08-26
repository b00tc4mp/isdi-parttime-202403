import registerUser from './registerUser.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser('Peter', 'Pan', 'peter@pan.com', 'pepa', '123123123', '123123123', 'teacher')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    }).catch(error => { console.error(error) })

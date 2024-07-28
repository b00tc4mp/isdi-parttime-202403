import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

const { MONGODB_URL_TEST } = process.env

mongoose.connect(MONGODB_URL_TEST)
    .then(() => {
        try {
            registerUser('Adrian', 'AdrianGon', 'adrian@gon.com', '123123')
                .then(() => console.log('User created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))
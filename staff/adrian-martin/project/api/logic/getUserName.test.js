import 'dotenv/config'
import mongoose, { mongo } from 'mongoose'

import getUserName from './getUserName.js'
const { MONGODB_URL_TEST } = process.env

mongoose.connect(MONGODB_URL_TEST)
    .then(() => {
        try {
            getUserName('66a756d17578edb80eb6834e', '66a93ff3e13670e3860d273d')
                .then(name => console.log('user name retrieved', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
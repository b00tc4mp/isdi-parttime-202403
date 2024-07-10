import 'dotenv/config'
import getUserName from './getUserName.js'
import mongoose from 'mongoose'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('668682e840eba57bc03f5d59', '668682e840eba57bc03f5d59')
                .then(name => console.log('username retrived', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
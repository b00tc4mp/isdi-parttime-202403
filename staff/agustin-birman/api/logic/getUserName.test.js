import mongoose from 'mongoose'
import getUserName from './getUserName.js'
import 'dotenv/config'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('6685c5e29e4dca5e7bbf9c49', '6685c5e29e4dca5e7bbf9c49')
                .then(name => console.log('user name retrieved', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

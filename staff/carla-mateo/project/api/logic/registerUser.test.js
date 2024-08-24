import 'dotenv/config'
import mongoose from 'mongoose'
import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser('66c2459f698221d4016c6e15', 'CASA', 'ron', 'ron@email.com', '1234', 'avatars/.jpg', 'familyOne')
                .then(() => {
                    console.log('User Created')
                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
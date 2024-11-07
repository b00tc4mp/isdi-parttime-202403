import 'dotenv/config'
import mongoose from 'mongoose'
import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser('66cac4ee4a7629597f88bb2b', 'HOWARDS', 'ana', 'ana@email.com', '1234', 'avatars/.jpg', 'mateo')
                .then(() => {
                    console.log('User Created')
                })
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
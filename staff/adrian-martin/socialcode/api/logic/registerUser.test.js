import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser('Cafe', 'Leche', 'cafe@leche.com', 'Cafeleche', '123123123', '123123123')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(() => console.error(error))

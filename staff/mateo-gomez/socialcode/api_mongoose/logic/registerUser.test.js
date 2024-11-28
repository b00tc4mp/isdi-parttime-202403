import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            //registerUser('Jason', 'Tatum', 'tatum@celtics.com', 'jasontatum', '123123123', '123123123')
            registerUser('Lamine', 'Yamal', 'lamine@yamal.com', 'lamineyamal', '123123123', '123123123')
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))



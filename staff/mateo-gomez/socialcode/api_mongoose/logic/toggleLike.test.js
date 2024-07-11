import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLike from './toggleLike.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            toggleLike('668a739a50df84d483367be9', '668e9d4c0c347f08b5781df7')
                .then(() => console.log('user toggled like'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))



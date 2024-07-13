import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLike from './toggleLike.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            toggleLike('668a892327b39d7b19b4e254', '668f9e232be9a16b2dfaf979')
                .then(() => console.log('user toggled like'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))



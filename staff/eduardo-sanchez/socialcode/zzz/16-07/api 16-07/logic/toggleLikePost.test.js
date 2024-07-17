import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost('668bf6db2c12b9a873e4cd2f', '668e5742434583df1da19b5d')
                .then(() => console.log('user toggled like'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
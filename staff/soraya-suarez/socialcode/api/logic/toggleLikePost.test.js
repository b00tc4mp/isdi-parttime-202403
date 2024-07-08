import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost('66859f3b6ef36441e7efcd0d', '66859db639a51a44e7c3900c', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user toggled like')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
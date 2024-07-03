import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost('Jorge', '66818e3c71ef25b1b82bed32', error => {
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

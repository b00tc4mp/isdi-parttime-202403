import 'dotenv/config'
import toggleLikePost from './toggleLikePost.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost('AdrianGon', '6684f171a11ed0d3e039db9a', error => {
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
    .catch(() => console.error(error))

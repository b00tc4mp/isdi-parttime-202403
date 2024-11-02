import 'dotenv/config'
import mongoose from 'mongoose'

import getAllPosts from './getAllPosts.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            getAllPosts('668bf6db2c12b9a873e4cd2f', (error, posts) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('posts retrieved', posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

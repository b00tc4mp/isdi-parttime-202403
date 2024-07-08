import 'dotenv/config'
import mongoose from 'mongoose'

import createComment from './createPostComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createComment('668af4c0d0a759a2295dfbfc', '668b8ac67c22954bcb060a33', 'Work hard, Play hard.', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('comment created')
            })
        } catch (error) {
            console.error(error)
        }


    })

    .catch(error => console.error(error))
import 'dotenv/config'
import mongoose from 'mongoose'

import createComment from './createComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createComment('DaenerysTargaryen', '668498c1816188d7c642eeec', 'Work hard, Play hard.', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post created')
            })
        } catch (error) {
            console.error(error)
        }


    })

    .catch(error => console.error(error))
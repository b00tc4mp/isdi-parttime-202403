import 'dotenv/config'
import mongoose from 'mongoose'

import deletePost from './deletePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deletePost("6686bf50f808e1baba4afcc8", "6686c1b60c2968fc5ea60cca",
                error => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    console.log('post deleted')
                })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))


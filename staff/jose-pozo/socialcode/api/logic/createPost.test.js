import 'dotenv/config'
import mongoose from 'mongoose'

import createPost from './createPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(connection => {
        try {
            createPost('668af4c0d0a759a2295dfbfc', 'I Will Rule', 'https://giphy.com/gifs/gameofthrones-hbo-game-of-thrones-daenerys-targaryen-Qw4X3FQhkNiq0Qyvt7O', 'I will rule', error => {
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
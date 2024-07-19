import 'dotenv/config'
import mongoose from 'mongoose'

import createPost from './createPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(connection => {
        try {
            createPost('6695412b9e2f727d388fc681', 'Baby Yoda', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXE1bGd1cjJqNzZzaGJ6Z2huMTBva3hlODB3NWViNTAzM2xvNWZpcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/krkrHAEodHgzP72rTI/giphy.gif', 'Baby Yoda')
                .then(() => console.log('post created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            getAllPosts("668682e840eba57bc03f5d59")
                .then(posts => console.log('posts retrived', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
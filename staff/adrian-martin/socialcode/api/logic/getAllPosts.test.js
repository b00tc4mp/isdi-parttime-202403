import 'dotenv/config'
import getAllPosts from './getAllPosts.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            getAllPosts("AdrianGon", (error, posts) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('posts retrived', posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
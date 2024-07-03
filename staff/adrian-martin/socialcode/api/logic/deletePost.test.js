import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            deletePost("AdrianGon", '6684f70f164ffdee1cbdc12b', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('posts deleted')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
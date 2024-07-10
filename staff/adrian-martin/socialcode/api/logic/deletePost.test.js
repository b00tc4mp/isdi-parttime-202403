import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            deletePost("668682e840eba57bc03f5d59", '668ea68c2ddb6bcfbd45bcf2')
                .then(() => console.log('posts deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
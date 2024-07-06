import 'dotenv/config'
import deletePost from './deletePost.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(connection => {
        try {
            deletePost('6689014036c5ff836afc8eb2', '6689026c2b626965a2370fcfno', error => {
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
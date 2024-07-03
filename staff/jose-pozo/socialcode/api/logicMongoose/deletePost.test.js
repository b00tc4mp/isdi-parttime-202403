import 'dotenv/config'
import mongoose from 'mongoose'

import deletePost from './deletePost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(connection => {
        try {
            deletePost("peterpan", "66847825e3502bc94fd34cb6",
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







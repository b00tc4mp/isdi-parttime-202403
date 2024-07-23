import 'dotenv/config'
import mongoose from 'mongoose'

import createPost from './createPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            createPost('668bf0d070e99e711ec35ee0', '!cucumber!', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2lnNHFqbzJhc2VydDYweWlsMHY2dzdnb3I2ODcwYjdka211dG94ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YMj6nx17vo1glV5J1d/giphy.gif', 'console.log("pepinilloooo!!!")')
                .then(() => console.log('post created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

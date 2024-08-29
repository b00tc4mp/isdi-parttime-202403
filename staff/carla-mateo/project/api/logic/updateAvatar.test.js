import 'dotenv/config'
import mongoose from 'mongoose'

import updateAvatar from './updateAvatar.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateAvatar('66cad15de2e0f70ae070925a', 'avatars/amarillo.png')
                .then(() => console.log('avatars/azul.png'))
                .catch((error) => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
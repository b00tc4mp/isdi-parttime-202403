import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLike from './toggleLike.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            toggleLike('668a739a50df84d483367be9', '668a78423a0226d1ab93fe55', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user toggled like')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))



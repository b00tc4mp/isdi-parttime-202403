import 'dotenv/config'
import mongoose from 'mongoose'

import deleteAdComment from './deleteAdComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteAdComment('66b22875dfaef1c0bd6d535e', '66c1c6b5c89ecaf42d52a327', '66c7173464f66cd03dfe60d7')
                .then(() => console.log('comment deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
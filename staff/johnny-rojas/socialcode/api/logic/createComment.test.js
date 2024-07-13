import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createPostComment('6686d3ea95f11487d2369d2b', '668beb61d01e3759a0ed261d', 'Test Coment') 
        .then(() => console.log('comment created'))
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))



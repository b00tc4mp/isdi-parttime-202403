import 'dotenv/config'
import mongoose from 'mongoose'

import createPostComment from './createComment.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createPostComment('6686d3ea95f11487d2369d21', '668be900850154231e361e4b', 'Test Coment', error => {
        if (error) {
          console.error(error)

          return
        }
        console.log('comment created')
      })
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))



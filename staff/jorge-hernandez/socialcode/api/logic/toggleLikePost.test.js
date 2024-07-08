import 'dotenv/config'
import mongoose from 'mongoose'

import toggleLikePost from './toggleLikePost.js'

const { MONGODB_URL } = process.env

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    try {
      toggleLikePost(
        '6689014036c5ff836afc8eb2',
        '66890621ba69ba714b3747f1',
        (error) => {
          if (error) {
            console.error(error)

            return
          }

          console.log('user toggled like')
        }
      )
    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))

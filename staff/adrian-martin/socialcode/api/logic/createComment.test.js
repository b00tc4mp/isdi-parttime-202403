import "dotenv/config"
import createComment from './createComment.js'
import mongoose from 'mongoose'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createComment("AdrianGon", "668293beb5a0a194d7be21f5", "comentario", (error) => {

        if (error) {
          console.error(error)

          return
        }

        console.log("comment created")
      })

    } catch (error) {

      console.error(error)
    }
  })
  .catch(error => console.error(error))
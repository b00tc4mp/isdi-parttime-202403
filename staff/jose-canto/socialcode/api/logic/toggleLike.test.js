import "dotenv/config"
import { MongoClient } from "mongodb"
import logic from './index.js'
import data from "../data/index.js"

const { MONGODB_URL } = process.env
const client = new MongoClient(MONGODB_URL)

client.connect()
  .then(connection => {

    const db = connection.db("test")
    const users = db.collection("users")
    const posts = db.collection("posts")

    data.users = users
    data.posts = posts

    try {
      logic.toggleLike("Jack", "667e8080053d0ec369021a9e", (error, postLiked) => {

        if (error) {
          console.error(error)

          return
        }

        if (postLiked) {
          console.log("post liked")
        } else {

          console.log("post not liked")
        }
      })

    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))

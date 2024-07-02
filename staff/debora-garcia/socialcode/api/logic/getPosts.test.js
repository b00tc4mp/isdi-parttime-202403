import "dotenv/config"
import { MongoClient } from "mongodb"
import data from "../data/index.js"

import logic from "./index.js"

const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db("test")
        const posts = db.collection("posts")
        const users = db.collection("users")

        data.users = users
        data.posts = posts

        try {
            logic.getPosts("RotoJaz", (error, posts) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log("posts retrieved", posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))



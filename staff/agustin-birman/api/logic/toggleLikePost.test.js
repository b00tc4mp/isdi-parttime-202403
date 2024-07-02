import logic from "./index.js"
import data from "../data/index.js"
import 'dotenv/config'
import { MongoClient } from "mongodb"

const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = client.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        data.users = users
        data.posts = posts

        try {
            logic.toggleLikePost('pepitogrillo', '8826114904894882-1716924151128', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post toggled like')
            })
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))

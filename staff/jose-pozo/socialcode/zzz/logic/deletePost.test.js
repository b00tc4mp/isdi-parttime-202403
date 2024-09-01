import logic from './index.js'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import data from '../data/index.js'

const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)


client.connect()
    .then(connection => {
        const db = connection.db('test')
        const users = db.collection('users')
        const posts = db.collection('posts')

        data.posts = posts
        data.users = users

        try {
            logic.deletePost("peterpan", "667ee0fe3d00307186b5b0e1",
                error => {
                    if (error) {
                        console.error(error)

                        return
                    }

                    console.log('post deleted')
                })
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))







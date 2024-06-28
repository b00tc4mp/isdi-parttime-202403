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
            logic.createPost('peterpan', 'hello world', 'https://miro.medium.com/v2/resize:fit:1024/1*OohqW5DGh9CQS4hLY5FXzA.png', 'console.log("hello world")', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('post created')
            })
        } catch (error) {
            console.error(error)
        }


    })

    .catch(error => console.error(error))
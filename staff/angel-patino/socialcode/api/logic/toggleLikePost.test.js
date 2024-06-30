import 'dotenv/config'
import { MongoClient } from 'mongodb'
import data from '../data/index.js'

import logic from './index.js'

const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        data.users = users
        data.posts = posts

        try {
            logic.toggleLikePost('Wendydarling', '66815fed173c860fcb9a4cb4', error => {
                //logic.registerUser('Wendy', 'Darling', 'wendy@darling.com', 'wendydarling', '123123123', '123123123', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user registered')
            })
        } catch (error) {
            console.error(error)
        }

    })
    .catch(error => console.error(error))

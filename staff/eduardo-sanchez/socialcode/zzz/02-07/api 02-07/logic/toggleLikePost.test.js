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
            logic.toggleLikePost('manzana', '6682fde32d0d51911e6b5e90', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user toggled like')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
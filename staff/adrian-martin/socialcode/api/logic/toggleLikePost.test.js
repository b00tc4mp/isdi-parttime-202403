import 'dotenv/config'
import logic from './index.js'
import { MongoClient } from 'mongodb'
import data from '../data/index.js'

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
            logic.toggleLikePost('AdrianGon', '668293beb5a0a194d7be21f5', error => {
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
    .catch(() => console.error(error))

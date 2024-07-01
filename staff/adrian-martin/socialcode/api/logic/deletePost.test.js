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
            logic.deletePost("AdrianGon", '66827cfdcb6735f4325c126a', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('posts deleted')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
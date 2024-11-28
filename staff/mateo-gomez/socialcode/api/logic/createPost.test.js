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
            logic.createPost('doncic', 'Hola', 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Mavs is close to get in the NBA Finals', error => {
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
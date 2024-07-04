/* authenticateUser

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

        data.users = users

        try {
            logic.authenticateUser('batmanwey', '123123', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user authenticated')
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error)) */

/* registerUser

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

        data.users = users

        try {
            logic.registerUser('Daniel', 'Guillen', 'dani@el.com', 'dani88', '123123', '123123', error => {
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
    .catch(error => console.error(error)) */

/* getAllPosts

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
            logic.getAllPosts('batmanwey', (error, posts) => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('posts retrieved', posts)
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error)) */

/*createPost

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
            logic.createPost('batmanwey', 'hellow', 'https://miro.medium.com/v2/resizehttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2pSrXVhu6EeZjXnjHQ5g6ApXMZEzpRXwJHQ&s:fit:1024/1*OohqW5DGh9CQS4hLY5FXzA.png', 'console.log("hellow")', error => {
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
    .catch(error => console.error(error)) */

    // deletePost

/*import 'dotenv/config'
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
            logic.deletePost('batmanwey', '66818d075e170f3bddc96241', error => {
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
    .catch(error => console.error(error))*/

    //mongoose registerUser

/*import 'dotenv/config'
import mongoose from 'mongoose'

import registerUser from './registerUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser('Cat', 'Woman', 'cat@woman.com', 'Catwoman', '123', '123', error => {
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
    .catch(error => console.error(error))*/

    //createPost

    import 'dotenv/config'
import mongoose from 'mongoose'

import createPost from './createPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPost('Catwoman', 'miaw', 'https://www.lacasadeel.net/wp-content/uploads/2022/11/batmancatwoman10-a-1068x539.jpg', 'miaw', error => {
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


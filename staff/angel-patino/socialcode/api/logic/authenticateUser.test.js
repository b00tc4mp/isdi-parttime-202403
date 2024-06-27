import 'dotenv/config'
import { MongoClient } from 'mongodb'
import data from '../data/index.js'

import logic from './index.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')

        data.users = users

        try {
            logic.authenticateUser('BatMan', '123123123', error => {
                if (error) {
                    console.error(error)

                    return
                }
                console.log('user authenticated')
            })
        } catch (error) {
            console.errror(error)
        }
    })
    .catch(error => console.error(error))
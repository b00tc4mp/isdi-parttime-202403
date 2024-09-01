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

        data.users = users

        try {
            logic.authenticateUser('peterpan', '123123123', error => {
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
    .catch(error => console.error(error))


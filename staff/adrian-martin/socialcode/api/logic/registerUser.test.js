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

        data.users = users

        try {
            logic.registerUser('Adrian', 'Martin', 'adrian@martin.com', 'AdrianGon', '321321321', '321321321', error => {
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
    .catch(() => console.error(error))

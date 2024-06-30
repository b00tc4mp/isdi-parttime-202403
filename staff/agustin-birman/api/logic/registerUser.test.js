import logic from "./index.js"
import data from "../data/index.js"
import 'dotenv/config'
import { MongoClient } from "mongodb"

const { MONGODB_URL } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = client.db('test')

        const users = db.collection('users')

        data.users = users

        try {
            logic.registerUser('Peter', 'Pan', 'peter@pan.com', 'peterpan', '123123123', '123123123', error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log('user registered')
            })
        } catch (error) {
            console.error(error)
        }
    }).catch(error => { console.log(error) })

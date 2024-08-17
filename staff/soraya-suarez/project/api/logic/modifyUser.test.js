import 'dotenv/config'
import mongoose from 'mongoose'

import modifyUser from './modifyUser.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            modifyUser('66b4c032d54497eae7195f22', 'Pe', 'Pi', 'pe@pi.com', '646876354', 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnZyaGx1amxvbzBpc2RycWlvc2FxbHZqanRxZmFsbDNtemdma3F4ZSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/UO5elnTqo4vSg/giphy.gif', '123123123', '123123123')
                .then(() => console.log('updated user'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
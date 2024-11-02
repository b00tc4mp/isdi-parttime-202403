import fs from 'fs'
import { SystemError } from 'com/errors.js'

const insertUser = (user, callback) => {
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (!json) json = '[]'

        const users = JSON.parse(json)

        // Verificar si el usuario ya existe
        const userExists = users.some(existingUser => existingUser.username === user.username || existingUser.email === user.email);

        if (userExists) {
            callback(new SystemError('User already exists'));
            return;
        }

        users.push(user)

        const newJson = JSON.stringify(users)

        fs.writeFile('./data/users.json', newJson, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null)
        })
    })
}

export default insertUser
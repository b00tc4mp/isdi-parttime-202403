import fs from 'fs';
import bcrypt from 'bcryptjs';
import { SystemError } from 'com/errors.js'; // Asegúrate de que la ruta es correcta

const insertUser = (user, callback) => {
    fs.readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message));
            return;
        }

        if (!json) json = '[]';

        const users = JSON.parse(json);

        const userExists = users.some(existingUser => 
            existingUser.username === user.username || existingUser.email === user.email
        );

        if (userExists) {
            callback(new SystemError('User already exists'));
            return;
        }

        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                callback(new SystemError(err.message));
                return;
            }

            user.password = hash;
            users.push(user);

            const newJson = JSON.stringify(users);

            fs.writeFile('./data/users.json', newJson, error => {
                if (error) {
                    callback(new SystemError(error.message));
                    return;
                }

                callback(null);
            });
        });
    });
}

export default insertUser;

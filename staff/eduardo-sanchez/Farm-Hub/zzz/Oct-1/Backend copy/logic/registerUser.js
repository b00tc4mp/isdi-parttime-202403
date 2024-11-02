import { User } from '../data/index.js';
import { DuplicityError, SystemError } from 'com/errors.js';
import validate from 'com/validate.js';
import bcrypt from 'bcryptjs';

const registerUser = (
    name,
    surname,
    email,
    username,
    password,
    passwordRepeat
) => {
    validate.name(name);
    validate.name(surname, 'surname');
    validate.email(email);
    validate.username(username);
    validate.password(password);
    validate.passwordsMatch(password, passwordRepeat);

    return User.findOne({ $or: [{ email }, { username }] })
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((user) => {
            if (user) throw new DuplicityError('User already exists');

            return bcrypt
                .hash(password, 8)
                .catch((error) => {
                    throw new SystemError(error.message);
                })
                .then((hash) => {
                    const newUser = {
                        name: name,
                        surname: surname,
                        email: email,
                        username: username,
                        password: hash,
                    };

                    return User.create(newUser)
                        .catch((error) => {
                            throw new SystemError(error.message);
                        })
                        .then(() => {});
                });
        });
};

export default registerUser;

import 'dotenv/config';

import jwt from '../util/jsonwebtoken-promised.js';

// import logic from '../logic/index.js'

import authenticateUser from '../logic/authenticateUser.js';

import { SystemError } from 'com/errors.js';

const { JWT_SECRET } = process.env;

export default (req, res, next) => {
    const { username, password } = req.body;

    try {
        authenticateUser(username, password)
            .then((userId) =>
                jwt
                    .sign({ sub: userId }, JWT_SECRET, { expiresIn: '30d' })
                    .then((token) => {
                        console.log(`User ${username} authenticated`);
                        res.json({ token, userId });
                    })
                    .catch((error) => next(new SystemError(error.message)))
            )
            .catch((error) => next(error));
    } catch (error) {
        next(error);
    }
};

// import jwt from '../util/jsonwebtoken-promised.js'

// import logic from '../logic/index.js'

// import { SystemError } from 'com/errors.js'

// const { JWT_SECRET } = process.env

// export default (req, res, next) => {
//     const { username, password } = req.body

//     try {
//         logic.authenticateUser(username, password)
//             .then(userId =>
//                 jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '7h' })
//                     .then(token => res.json(token))
//                     .catch(error => next(new SystemError(error.message)))
//             )
//             .catch(error => next(error))
//     } catch (error) {
//         next(error)
//     }
// }

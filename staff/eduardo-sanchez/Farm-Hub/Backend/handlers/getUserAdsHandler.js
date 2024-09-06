import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        if (!token) {
            return next(new CredentialsError('No token provided'));
        }

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                // const { tokenUserId } = req.params.userId //No puedes desestructurar req.params.userId como si fuera un objeto, ya que es un valor directo.


                const tokenUserId = req.params.userId //para obtener el userId de los parámetros de la URL.

                try {
                    logic.getUserAds(userId, tokenUserId)
                        .then(userAds => res.json(userAds))
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialsError(error.message)))
    } catch (error) {
        next(error)
    }
}


//////////////////////////////////




// import jwt from '../util/jsonwebtoken-promised.js'

// import logic from '../logic/index.js'

// import { CredentialsError } from 'com/errors.js'

// const { JWT_SECRET } = process.env

// export default (req, res, next) => {
//     try {
//         const token = req.headers.authorization.slice(7)

//         jwt.verify(token, JWT_SECRET)
//             .then(payload => {

//                 const { sub: userId } = payload

//                 try {
//                     logic.getUserAds(userId)
//                         .then(userAds => res.json(userAds))
//                         .catch(error => next(error))
//                 } catch (error) {
//                     next(error)
//                 }
//             })
//             .catch(error => next(new CredentialsError(error.message)))
//     } catch (error) {
//         next(error)
//     }
// }


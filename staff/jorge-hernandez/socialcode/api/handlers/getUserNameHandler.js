const { JWT_SECRET } = process.env

import logic from '../logic/index.js'

import jwt from '../util/jsonwebtoken-promised.js'

import { CredentialsError } from 'com/errors.js'

import handleErrorResponse from '../handlers/helper/handleErrorResponse.js'

export default (req, res) => {
  try {
    const token = req.headers.authorization.slice(7)

    jwt
      .verify(token, JWT_SECRET)
      .then((payload) => {
        const { sub: userId } = payload

        const { targetUserId } = req.params

        try {
          logic
            .getUserName(userId, targetUserId)
            .then((name) => res.json(name))
            .catch((error) => handleErrorResponse(error, res))
        } catch (error) {
          handleErrorResponse(error, res)
        }
      })
      .catch((error) =>
        handleErrorResponse(new CredentialsError(error.message), res)
      )
  } catch (error) {
    handleErrorResponse(error, res)
  }
}

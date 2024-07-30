const { JWT_SECRET } = process.env

import logic from '../logic/index.js'

import jwt from '../util/jsonwebtoken-promised.js'

import handleErrorResponse from '../handlers/helper/handleErrorResponse.js'

import { SystemError } from 'com/errors.js'

export default (req, res) => {
  const { username, password } = req.body

  try {
    logic
      .authenticateUser(username, password)
      .then((userId) =>
        jwt
          .sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
          .then((token) => res.json(token))
          .catch((error) =>
            handleErrorResponse(new SystemError(error.message), res)
          )
      )
      .catch((error) => handleErrorResponse(error, res))
  } catch (error) {
    handleErrorResponse(error, res)
  }
}

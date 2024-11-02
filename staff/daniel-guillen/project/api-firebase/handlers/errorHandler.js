import { ContentError, MatchError, DuplicityError, SystemError, ValidationError, CredentialsError, NotFoundError } from 'com/errors.js'

const errorHandler = (error, req, res, next) => {
    let status = 500

    if (error instanceof ContentError) {
        status = 400
    } else if (error instanceof MatchError) {
        status = 412
    } else if (error instanceof DuplicityError) {
        status = 409
    } else if (error instanceof SystemError) {
        status = 500
    } else if (error instanceof ValidationError) {
        status = 422
    } else if (error instanceof CredentialsError) {
        status = 401
    } else if (error instanceof NotFoundError) {
        status = 404
    }

    res.status(status).json({ error: error.name, message: error.message })
}

export default errorHandler

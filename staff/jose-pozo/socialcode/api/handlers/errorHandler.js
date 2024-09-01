import { ContentError, CredentialsError, DuplicityError, MatchError, NotFoundError, SystemError } from 'com/errors.js'

function handleErrorResponse(error, res) {
    let status = 500

    if (error instanceof DuplicityError)
        status = 409

    else if (error instanceof ContentError)
        status = 400

    else if (error instanceof MatchError)
        status = 412

    else if (error instanceof CredentialsError)
        status = 401

    else if (error instanceof NotFoundError)
        status = 404

    res.status(status).json({ error: error.constructor.name, message: error.message })
}

export default handleErrorResponse
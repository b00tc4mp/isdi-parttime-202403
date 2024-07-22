class ContentError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class MatchError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class CredentialError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError,
    CredentialError,
    NotFoundError
}

const error = {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError,
    CredentialError,
    NotFoundError
}

export default error
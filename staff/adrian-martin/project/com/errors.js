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

class ValidateError extends Error {
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
    NotFoundError,
    ValidateError
}

const errors = {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError,
    CredentialError,
    NotFoundError,
    ValidateError
}

export default errors
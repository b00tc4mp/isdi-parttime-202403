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
        //.captureStackTrace(this.constructor)

    }
}

class DuplicityError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        //Error.captureStackTrace(this.constructor)

    }
}

class SystemError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name

    }
}

//juntamos el archivo errors de app y api 
export {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError
}

const errors = {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError
}

export default errors

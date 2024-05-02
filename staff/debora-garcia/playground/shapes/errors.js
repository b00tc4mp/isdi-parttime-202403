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



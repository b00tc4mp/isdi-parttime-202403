class ContentError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
        //this.name = ContentError.name
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


/* La clase `...Error` extiende la clase `Error` en JavaScript y establece su propia propiedad de nombre en
el nombre del constructor. */

class ContentError extends Error {
    constructor(message) {
        super(message)

        //this.name = ContentError.name
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
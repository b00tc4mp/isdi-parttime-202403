function ContentError(message){
    this.message = message

    Error.captureStackTrace(this, this.constructor)
}

ContentError.prototype = Object.create(Error.prototype)
ContentError.prototype.constructor = ContentError
ContentError.prototype.name = ContentError.name

function MatchError(message){
    this.message = message
    
    Error.captureStackTrace(this, this.constructor)
}

MatchError.prototype = Object.create(Error.prototype)
MatchError.prototype.constructor = MatchError
MatchError.prototype.name = MatchError.name


function DuplicityError(message){
    this.message = message
    
    Error.captureStackTrace(this, this.constructor)
}

DuplicityError.prototype = Object.create(Error.prototype)
DuplicityError.prototype.constructor = DuplicityError
DuplicityError.prototype.name = DuplicityError.name


function InputError(message){
    this.message = message
    
    Error.captureStackTrace(this, this.constructor)
}

class SystemError extends Error{
    constructor(message) {
        super (message)

        this.name = this.constructor.name
    }
}

InputError.prototype = Object.create(Error.prototype)
InputError.prototype.constructor = InputError
InputError.prototype.name = InputError.name



const errors = {
    ContentError,
    MatchError,
    DuplicityError,
    InputError,
    SystemError
}
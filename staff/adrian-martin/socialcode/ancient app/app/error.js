class ContentError extends Error{
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class MatchError extends Error{
    constructor(message){
        super(message)

        this.name = this.constructor.name
    }
}

class DuplicityError extends Error{
    constructor(message){
        super(message)
        
        this.name = this.constructor.name
    }
}

class SystemError extends Error{
    constructor(message){
        super(message)
        
        this.name = this.constructor.name
    }
}

const errors = {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError
}


// class ContentError extends Error{
//     constructor(message){
//         super(message)

//     Error.captureStackTrace(this, this.constructor)
//     this.name = ContentError.name
//     }
// }

//     class MatchError extends Error{
//     constructor(message){
//     this.message = message

//     Error.captureStackTrace(this, this.constructor)
//     this.name = MatchError.name
//     }
// }

//     class DuplicityError extends Error{
//         constructor(message){
//         this.message = message

//         Error.captureStackTrace(this, this.constructor)
//         this.name = DuplicityError.name
//     }
// }


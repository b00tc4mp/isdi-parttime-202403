function ContentError(message) {
    this.message = message
    Error.captureStackTrace(this, this.constructor)
}

ContentError.prototype = Object.create(Error.prototype)
ContentError.prototype.constructor = ContentError
ContentError.prototype.name = ContentError.name

function MatchError(message) {
    this.message = message
    Error.captureStackTrace(this, this.constructor)
}

MatchError.prototype = Object.create(Error.prototype)
MatchError.prototype.constructor = MatchError
MatchError.prototype.name = MatchError.name

function DuplicityhError(message) {
    this.message = message
    Error.captureStackTrace(this, this.constructor)
}

DuplicityhError.prototype = Object.create(Error.prototype)
DuplicityhError.prototype.constructor = DuplicityhError
DuplicityhError.prototype.name = DuplicityhError.name
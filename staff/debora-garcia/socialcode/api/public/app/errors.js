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

// creando un objeto podemos recuperar el constructor (classe), a partir de un objeto recuperamos otro objeto clase y luego usarla para recostruir un error
const errors = {
    ContentError,
    MatchError,
    DuplicityError,
    SystemError
}

//en Es6 si la propiedad y el valor se llaman igual no hace falta escribir p.e: ContentError:ContentError

//errors tiene propiedades que tienen como nombre las constructoras y dentro las constructoras
//podemos recuperar los constructores utilizando el objeto error y pasandole el nombre de la constructora
// error["ContentError"]= class ContentError extends Error {
 //   constructor(message) {
   //     super(message)

     //   this.name = this.constructor.name
 //   }
//}
// Movemos el archivo error.js para poder usarlo tanto en api como en app, creandolo como una dependencia e instalandolo en api y app como dependencia.


class ContentError extends Error {
  constructor(message) {
    super(message); // Llama al constructor de la clase base con el mensaje de error

    this.name = this.constructor.name; // Establece el nombre del error
    //this.name = ContentError.name
  }
}

class MatchError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}

class DuplicityError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}

class SystemError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}

const errors = {
  ContentError,
  MatchError,
  DuplicityError,
  SystemError
}

export default errors;
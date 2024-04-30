class ContentError extends Error {
  constructor(message) {
    super(message); // Llama al constructor de la clase base con el mensaje de error
    this.name = this.constructor.name; // Establece el nombre del error
    Error.captureStackTrace(this.constructor); // Captura la traza de pila
  }
}

class MatchError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this.constructor);
  }
}

class DuplicityError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this.constructor);
  }
}

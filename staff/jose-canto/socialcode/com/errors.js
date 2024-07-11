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

class CredentialsError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
  }
}

export {
  ContentError,
  MatchError,
  DuplicityError,
  SystemError,
  CredentialsError,
  NotFoundError
}

const errors = {
  ContentError,
  MatchError,
  DuplicityError,
  SystemError,
  CredentialsError,
  NotFoundError
}

export default errors;
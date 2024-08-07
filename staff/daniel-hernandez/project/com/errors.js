class ConnectionError extends Error {
   constructor(message) {
      super(message);
      this.name = this.constructor.name;
   }
}

class InvalidArgumentError extends Error {
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

class DuplicateEntryError extends Error {
   constructor(message) {
      super(message);
      this.name = this.constructor.name;
   }
}

class CredentialError extends Error {
   constructor(message) {
      super(message);
      this.name = this.constructor.name;
   }
}

class InvalidTokenError extends Error {
   constructor(message) {
      super(message);
      this.name = this.constructor.name;
   }
}

class TokenExpiredError extends Error {
   constructor(message) {
      super(message);
      this.name = this.constructor.name;
   }
}

export { ConnectionError, InvalidArgumentError, SystemError, DuplicateEntryError, CredentialError, InvalidTokenError, TokenExpiredError };

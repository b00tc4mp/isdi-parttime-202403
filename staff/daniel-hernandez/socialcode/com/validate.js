import { ContentError, MatchError } from "./errors.js";

export const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
export const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/;
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ID_REGEX = /^[a-z0-9]+[a-z0-9]{5}$/;

function validateName(name, reason = "Name") {
  if (typeof name !== "string" || !NAME_REGEX.test(name)) {
    throw new ContentError(`${reason} is not valid`);
  }
}

function validateUsername(username, reason = "Username") {
  if (typeof username !== "string" || !USERNAME_REGEX.test(username)) {
    throw new ContentError(`${reason} is not valid`);
  }
}

function validatePassword(password) {
  if (typeof password !== "string" || !PASSWORD_REGEX.test(password)) {
    throw new ContentError("Password is not valid");
  }
}

function validateMatchingPasswords(password, repeatedPassword) {
  if (password !== repeatedPassword) {
    throw new MatchError("Passwords don't match");
  }
}

function validateEmail(email) {
  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    throw new ContentError("Email is not valid");
  }
}

function validateCallback(callback) {
  if (typeof callback !== "function") {
    throw new TypeError("callback is not a function");
  }
}

function validateText(text, reason = "Text", maxLength = Infinity) {
  if (typeof text !== "string" || !text.length || text.length > maxLength) {
    throw new ContentError(`${reason} is not valid`);
  }
}

function validateUrl(url, reason = "Url") {
  if (typeof url !== "string" || !url.startsWith("http")) {
    throw new ContentError(`${reason} is not valid`);
  }
}

function validateId(id, reason = "Id") {
  if (!ID_REGEX.test(id)) {
    throw new ContentError(`${reason} is not valid`);
  }
}

const validate = {
  name: validateName,
  username: validateUsername,
  password: validatePassword,
  matchingPasswords: validateMatchingPasswords,
  email: validateEmail,
  callback: validateCallback,
  text: validateText,
  url: validateUrl,
  id: validateId,
};

export default validate;

import { ContentError, MatchError } from "../errors.js"

const ACCESS_OPTIONS = ['admin', 'almacen', 'vehiculos']
const USERNAME_REGEX = /^[\w-]+$/ // letras, números, guiones y guiones bajos
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{6,}$/ // letras, números y símbolos específicos con longitud mínima de 6 caracteres

export function validateUsername(username) {
    if (typeof username !== 'string' || username.length < 3 || !USERNAME_REGEX.test(username)) {
        throw new ContentError('Nombre de usuario no válido. Debe tener al menos 3 caracteres y solo puede contener letras, números, guiones.')
    }
}

export function validatePassword(password) {
    if (typeof password !== 'string' || !PASSWORD_REGEX.test(password)) {
        throw new ContentError('La contraseña debe tener al menos 6 caracteres y solo puede contener letras, números y los símbolos - $ % & = [ ] { } < > ( )')
    }
}
// validar inputs contraseña y repetir contraseña sean iguales
export function validatePasswordRepeat(password, passwordRepeat) {
    if (passwordRepeat !== null && password !== passwordRepeat) { 
        throw new MatchError('Las contraseñas no coinciden')
    }
}

export function validateAccess(access) {
    if (!ACCESS_OPTIONS.includes(access)) {
        throw new ContentError('El campo "access" debe ser "admin", "almacen", o "vehiculos".')
    }
}

const validate = {
    username: validateUsername,
    password: validatePassword,
    passwordRepeat: validatePasswordRepeat,
    access: validateAccess
}

export default validate
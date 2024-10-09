// Validaciones en comun username y password
export const validateUsernameAndPassword = (username, password) => {
    if (typeof username !== 'string' || username.length < 3) {
        throw new Error('Nombre de usuario no válido o demasiado corto. Debe tener al menos 3 caracteres')
    }

    if (typeof password !== 'string' || password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres')
    }
}

// validaciones de registro
export const validateUserRegistration = (username, password, passwordRepeat, access) => {
    validateUsernameAndPassword(username, password) //validaciones en comun

    if (passwordRepeat !== null && password !== passwordRepeat) { // validar inputs contraseña sean iguales
        throw new Error('Las contraseñas no coinciden')
    }

    if (!['admin', 'almacen', 'vehiculos'].includes(access)) { // validar input acceso
        throw new Error('El campo "access" debe ser "admin", "almacen", o "vehiculos".')
    }
}

export default { validateUsernameAndPassword, validateUserRegistration }

export const validateUser = (username, password, passwordRepeat, access) => {
    if (typeof username !== 'string' || username.length < 3) {
        throw new Error('Nombre de usuario no válido o demasiado corto. Debe tener al menos 3 caracteres');
    }

    if (!['admin', 'almacen', 'vehiculos'].includes(access)) {
        throw new Error('El campo "access" debe ser "admin", "almacen", o "vehiculos".');
    }

    if (password !== passwordRepeat) {
        throw new Error('Las contraseñas no coinciden');
    }

    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
}
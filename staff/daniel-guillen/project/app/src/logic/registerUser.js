import app, { db } from '../utils/config'
import { doc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import { ValidationError, SystemError } from 'com/errors'
import validate from 'com/validate'

const auth = getAuth(app)

const registerUser = async (email, username, password, passwordRepeat, access) => {
    try {
        // Realizar las validaciones
        validate.email(email)
        validate.username(username)
        validate.password(password)
        validate.passwordsMatch(password, passwordRepeat)

    } catch (validationError) {
        console.error("Validation error: ", validationError)
        throw new ValidationError(validationError.message)
    }

    try {
        // Crear el usuario con email y contraseña en Firebase Auth
        const infoUser = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
        ).then((userFirebase) => {
            return userFirebase
        })

        // Crear documento en Firestore para el usuario registrado
        const docRef = doc(db, `users/${infoUser.user.uid}`)
        await setDoc(docRef, {
            Usuario: username,
            Correo: email,
            Acceso: access
        })

        console.log("User registered: " + username + " " + infoUser.user.uid)
        return infoUser.user.uid

    } catch (e) {
        console.error("System error: ", e)
        throw new SystemError('Error registering user in Firestore')
    }
}

export default registerUser
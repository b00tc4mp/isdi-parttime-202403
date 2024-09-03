import { db } from '../utils/config'
import { collection, addDoc } from 'firebase/firestore'

import { ValidationError, SystemError } from 'com/errors'
import validate from 'com/validate'

const registerUser = async (username, password, passwordRepeat, access) => {
    try {
        //validaciones
        validate.username(username)
        validate.password(password)
        validate.passwordsMatch(password, passwordRepeat)

        // estructura de usuario
        const user = {
            Usuario: username,
            Password: password,
            Acceso: access,
        }

        //coleccion firestore
        const userCollection = collection(db, 'users')
        await addDoc(userCollection, user)

        console.log("User registered: " + username + " con acceso en " + access)

        // usuario
        return user
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error: ", error)
            throw new ValidationError(error.message)
        } else {
            console.error("System error: ", error)
            throw new SystemError('Error registering user in Firestore')
        }
    }
}

export default registerUser
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../utils/config'
import { SystemError } from 'com/errors'
import validate from 'com/validate'

const registerUser = async (name, surname, username, password, passwordRepeat, access) => {
    // validaciones
    validate.name(name)
    validate.name(surname, 'surname')
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    try {
        
        const docRef = await addDoc(collection(db, "users"), {
            name,
            surname,
            username,
            password,
            access, 
        })
        
        console.log("User registered with ID: ", docRef.id)
    } catch (e) {
        throw new SystemError('Error registering user in Firestore')
    }
}

export default registerUser
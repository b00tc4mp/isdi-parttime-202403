import 'dotenv/config'
import { db } from '../../firebase.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
// validation errors
import validate from 'com/validate/validateUsers.js'
import { CredentialsError, NotFoundError, SystemError } from 'com/errors.js'

// Handler para la autenticacion de usuario
const loginUser = async (req, res, next) => {
    const { username, password } = req.body
    
      // Validar los datos de usuario
      try{
        validate.username(username)
        validate.password(password)

        const userQuery = await db.collection('users').where('username', '==', username).get()

        // verificar si el usuario existe
        if (userQuery.empty) {
            return next(new NotFoundError('Nombre de usuario no existe'))
        }

        const userDoc = userQuery.docs[0]
        const user = userDoc.data()

        // verificar la contraseña
        const isValidPassword = bcryptjs.compareSync(password, user.password)
        if (!isValidPassword) {
            return next(new CredentialsError('Contraseña no válida'))
        }

        // generamos token
        const token = jwt.sign(
            { userId: userDoc.id, username: user.username, access: user.access },
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        )

        console.log(`Usuario autenticado: Bienvenido ${username}!`)
        // Respuesta exitosa
        return res.status(200).json({ message: 'Inicio de sesión exitoso', token })
    } catch (error) {
        if (error instanceof CredentialsError || error instanceof NotFoundError) {
            return next(error)
        }
        return next(new SystemError(`Error en el inicio de sesión: ${error.message}`))
    }
}

export default loginUser
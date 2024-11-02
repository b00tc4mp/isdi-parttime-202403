import { db } from '../../firebase.js'
import jwt from 'jsonwebtoken'
// errors
import { SystemError, CredentialsError, NotFoundError } from 'com/errors.js'

// Handler para obtener el nombre y el nivel de acceso
const getUserName = async (req, res, next) => { 
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return next(new CredentialsError('Token no proporcionado, acceso denegado'))
    }

    try { // verificamos el token       
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        const userId = decoded.userId
        // buscamos el usuario en la base de datos
        const userDoc = await db.collection('users').doc(userId).get()

        if (!userDoc.exists) { // usuario no exite
            return next(new NotFoundError('Usuario no encontrado'))
        }

        const user = userDoc.data()
        // devolvemos el username y access
        return res.status(200).json({ username: user.username, access: user.access })

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(new CredentialsError('Token inválido o expirado'))
        }

        console.error('Error al obtener datos del usuario', error)
        return next(new SystemError(`Error al obtener datos del usuario: ${error.message}`))
    }
}

export default getUserName
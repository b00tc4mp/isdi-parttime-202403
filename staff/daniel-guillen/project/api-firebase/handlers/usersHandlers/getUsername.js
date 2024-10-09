import { db } from '../../firebase.js'
import jwt from 'jsonwebtoken'

const getUserName = async (req, res) => { // Handler para obtener el nombre y el nivel de acceso
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' })
    }

    try {        
        const decoded = jwt.verify(token, process.env.SECRET_JWT) // verificamos el token
        const userId = decoded.userId

        const userDoc = await db.collection('users').doc(userId).get() // buscamos el usuario en la base de datos

        if (!userDoc.exists) { // usuario no exite
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        const user = userDoc.data()

        return res.status(200).json({ username: user.username, access: user.access }) // devolvemos el username y access

    } catch (error) {
        console.error('Error al obtener datos del usuario', error)
        return res.status(500).json({ message: `Error al obtener datos del usuario: ${error.message}` })
    }
}

export default getUserName

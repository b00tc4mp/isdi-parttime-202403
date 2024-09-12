import { db } from '../../firebase.js'
import jwt from 'jsonwebtoken'

// Handler para obtener el nombre y el nivel de acceso
const getUserName = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' })
    }

    try {
        // verificamos el token
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        const userId = decoded.userId

        // buscamos el usuario en la base de datos
        const userDoc = await db.collection('users').doc(userId).get()

        // usuario exite
        if (!userDoc.exists) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        const user = userDoc.data()

        // devolvemos el username y access
        return res.status(200).json({ username: user.username, access: user.access })

    } catch (error) {
        console.error('Error al obtener datos del usuario', error)
        return res.status(500).json({ message: `Error al obtener datos del usuario: ${error.message}` })
    }
}

export default getUserName

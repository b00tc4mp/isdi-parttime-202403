import bcryptjs from 'bcryptjs'
import { db } from '../../firebase.js'
import { validateUserRegistration } from 'com/validate/validateCreateUser.js'

const createUser = async (req, res) => { // Handler para crear un usuario
    try {
        const { username, access, password } = req.body

        validateUserRegistration(username, password, null, access) // validar inputs

        const userQuery = await db.collection('users').where('username', '==', username).get() // evitar duplicados
        if (!userQuery.empty) {
            console.log('Nombre de usuario ya existe')
            return res.status(409).json({ message: 'Nombre de usuario ya existe' })
        }
        
        const saltRounds = 10 // Hash en la contraseña
        const hashedPassword = await bcryptjs.hash(password, saltRounds)

        const newUser = { // Crear nuevo usuario
            username,
            access,
            password: hashedPassword,
        }

        const userRef = await db.collection('users').add(newUser) // Agregar el nuevo usuario a la colección 'users'

        console.log(`Usuario registrado: ${username} con acceso en ${access}`)

        res.status(201).json({
            message: 'Nuevo usuario registrado',
            username: newUser.username,
            access: newUser.access,
        })
    } catch (error) {
        console.error('Error al registrar nuevo usuario', error)
        res.status(500).json({ message: 'Error al registrar nuevo usuario' })
    }
}

export default createUser
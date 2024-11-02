import bcryptjs from 'bcryptjs'
import { db } from '../../firebase.js'
// validation errors
import validate from 'com/validate/validateUsers.js'
import { ContentError } from 'com/errors.js'

const createUser = async (req, res, next) => { // Handler para crear un usuario
    try {
        const { username, access, password} = req.body

        // Validar los datos de usuario
        try{
            validate.username(username)
            validate.password(password)
            validate.access(access)

        } catch (validationError) {
            return next(new ContentError(validationError.message))
          }

        // evitar duplicados
        const userQuery = await db.collection('users').where('username', '==', username).get() 
        if (!userQuery.empty) {
            console.log('Nombre de usuario ya existe')
            return res.status(409).json({ message: 'Nombre de usuario ya existe' })
        }
        
        const saltRounds = 10 // Hash en la contraseña
        const hashedPassword = await bcryptjs.hash(password, saltRounds)

        // Crear el objeto de usuario
        const newUser = {
            username,
            access,
            password: hashedPassword,
        }
        // Guardar en la base de datos (Firebase)
        const userRef = await db.collection('users').add(newUser)

        console.log(`Usuario registrado: ${username} con acceso en ${access}`)
        // Respuesta exitosa
        res.status(201).json({
            message: 'Nuevo usuario registrado',
            username: newUser.username,
            access: newUser.access,
        })
    } catch (error) {
        next(error)
    }
    }

export default createUser
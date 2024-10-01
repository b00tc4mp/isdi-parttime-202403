import { db } from '../../firebase.js'
import bcryptjs from 'bcryptjs'

// Handler para crear un nuevo usuario
const createUser = async (req, res) => {
    const { username, access, password } = req.body
  
    try {
      // Validacion de entradas
      if (typeof username !== 'string' || username.length < 3) {
        console.error('Nombre de usuario no válido o demasiado corto')
        return res.status(400).json({ message: 'Nombre de usuario no válido o demasiado corto' })
      }

      if (!['admin', 'almacen', 'vehiculos'].includes(access)) {
        console.log('Error: El campo "access" debe ser uno de los siguientes valores: admin, almacen, vehiculos.')
        return res.status(400).json({ message: 'El campo "access" debe ser "admin", "almacen", o "vehiculos".' });
      }
  
      if (typeof password !== 'string' || password.length < 6) {
        console.error('Contraseña no válida o demasiado corta')
        return res.status(400).json({ message: 'Contraseña no válida o demasiado corta (mínimo 6 caracteres)' })
      }
  
      // Verificar si el nombre de usuario ya existe
      const userQuery = await db.collection('users').where('username', '==', username).get()
  
      if (!userQuery.empty) {
        console.log('Nombre de usuario ya existe')
        return res.status(409).json({ message: 'Nombre de usuario ya existe' })
      }
  
      // Hash en la contraseña
      const saltRounds = 10
      const hashedPassword = await bcryptjs.hash(password, saltRounds)
  
      // Crear nuevo usuario
      const newUser = {
        username,
        access,
        password: hashedPassword,
      }
  
      const userRef = await db.collection('users').add(newUser)
  
      console.log(`Usuario registrado: ${username} con acceso en ${access}`)
  
      res.status(201).json({
        message: 'Nuevo usuario registrado',
        userId: userRef.id,
        username: newUser.username,
        access: newUser.access,
      })
    } catch (error) {
      console.error('Error al registrar nuevo usuario', error)
      res.status(500).json({ message: 'Error al registrar nuevo usuario' })
    }
  }
  
  export default createUser
import 'dotenv/config'
import { db } from '../../firebase.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Handler para la autenticacion de usuario
const loginUser = async (req, res) => {
    const { username, password } = req.body
  
    try {
      const userQuery = await db.collection('users').where('username', '==', username).get()

    // verificar usuario existe
    if (userQuery.empty) {
        console.error('Nombre de usuario no existe')
        return res.status(404).json({ message: 'Nombre de usuario no existe' })
      }
  
      const userDoc = userQuery.docs[0]
      const user = userDoc.data()

    // verificar contraseña
      const isValidPassword = bcryptjs.compareSync(password, user.password)
      if (!isValidPassword) {
        console.error('Contraseña no válida')
        return res.status(401).json({ message: 'Contraseña no válida' })
      }
        
      // Generar token para mandar al front
      const token = jwt.sign({ userId: userDoc.id, username: user.username, access: user.access }, process.env.SECRET_JWT, { expiresIn: '1h' })
  
      console.log(`Usuario autenticado: Bienvenido ${username}!`)
      return res.status(200).json({ message: 'Inicio de sesión exitoso', token })
    } catch (error) {
      console.error('Error en el inicio de sesión', error)
      return res.status(500).json({ message: 'Error en el inicio de sesión' })
    }
  }

  export default loginUser
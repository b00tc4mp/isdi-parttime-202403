import { Router } from 'express'
import { db } from '../firebase.js'
import bcryptjs from 'bcryptjs'

const router = Router()

// Traer todos los usuarios
router.get('/', async (req, res) => {
  try {
    const querySnapshot = await db.collection('users').get()
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log('Lista de usuarios:', users)
    res.send('Está vivo!')
  } catch (error) {
    console.error('Error al obtener usuarios', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
})

// Crear nuevo usuario
router.post('/newUser', async (req, res) => {
  const { username, access, password } = req.body

  try {
    // Validacion de entradas
    if (typeof username !== 'string' || username.length < 3) {
      console.error('Nombre de usuario no válido o demasiado corto')
      return res.status(400).json({ message: 'Nombre de usuario no válido o demasiado corto' })
    }

    if (typeof password !== 'string' || password.length < 3) {
      console.error('Contraseña no válida o demasiado corta (mínimo 6 caracteres)')
      return res.status(400).json({ message: 'Contraseña no válida o demasiado corta (mínimo 6 caracteres)' })
    }

    // Verificar si el nombre de usuario ya existe
    const userQuery = await db.collection('users').where('username', '==', username).get()

    if (!userQuery.empty) {
      console.log('Nombre de usuario ya existe')
      return res.status(409).json({ message: 'Nombre de usuario ya existe' })
    }

    // Hash de la contraseña
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
})

// Eliminar usuario utilizando ID
router.delete('/deleteUser/:id', async (req, res) => {
  const userId = req.params.id

  try {
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()

    // Si no existe
    if (!userDoc.exists) {
      console.error('Usuario no encontrado')
      return res.status(404).send('Usuario no encontrado')
    }

    const { username } = userDoc.data()  // Extraer username para incluirlo en el mensaje

    await userRef.delete()  // Eliminar

    console.log(`Usuario ${username} eliminado`)
    res.status(200).send(`Usuario ${username} eliminado`)  // Mensaje
  } catch (error) {
    console.error('Error al eliminar usuario', error)
    res.status(500).send('Error al eliminar usuario')
  }
})

// Autenticacion de usuario
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // Validacion de entradas(no son necesarias)
    // if (typeof username !== 'string' || username.length < 3) {
    //   console.error('Nombre de usuario no válido')
    //   return res.status(400).json({ message: 'Nombre de usuario no válido' })
    // }

    // if (typeof password !== 'string' || password.length < 3) {
    //   console.error('Contraseña no válida')
    //   return res.status(400).json({ message: 'Contraseña no válida' })
    // }

    // Verificar si el nombre de usuario existe
    const userQuery = await db.collection('users').where('username', '==', username).get()

    if (userQuery.empty) {
      console.error('Nombre de usuario no existe')
      return res.status(404).json({ message: 'Nombre de usuario no existe' })
    }

    // username no debe estar repetido para el correcto funcionamiento
    const userDoc = userQuery.docs[0]
    const user = userDoc.data()

    // Verificar si la contraseña es correcta
    const isValidPassword = bcryptjs.compareSync(password, user.password)
    if (!isValidPassword) {
      console.error('Contraseña no válida')
      return res.status(401).json({ message: 'Contraseña no válida' })
    }

    // Autenticacion completada
    console.log(`Usuario autenticado: Bienvenido ${username}!`)
    return res.status(200).json({ message: 'Inicio de sesión exitoso', userId: userDoc.id, username: user.username })
  } catch (error) {
    console.error('Error en el inicio de sesión', error)
    return res.status(500).json({ message: 'Error en el inicio de sesión' })
  }
})

export default router

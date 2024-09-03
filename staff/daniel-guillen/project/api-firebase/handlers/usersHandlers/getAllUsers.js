import { db } from '../../firebase.js'

// Handler para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const querySnapshot = await db.collection('users').get()
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log('Lista de usuarios:', users)
    res.status(200).json(users)
  } catch (error) {
    console.error('Error al obtener usuarios', error)
    res.status(500).json({ message: 'Error al obtener usuarios' })
  }
}

export default getAllUsers
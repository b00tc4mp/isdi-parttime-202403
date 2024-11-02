import { db } from '../../firebase.js'
// errors
import { SystemError } from 'com/errors.js'

// Handler para obtener todos los usuarios
const getAllUsers = async (req, res, next) => {
  try {
    const usersCollection = db.collection('users')
    const querySnapshot = await usersCollection.get()

    if (querySnapshot.empty) {
      console.log('No se encontraron documentos en la colección users.')
      return res.status(200).json([])
    }
    
    // Mapear los documentos obtenidos
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log('Lista de usuarios:', users)
    // Respuesta exitosa
    res.status(200).json(users)
  } catch (error) {
    next(new SystemError('Error al obtener los usuarios solicitados'))
  }
}

export default getAllUsers
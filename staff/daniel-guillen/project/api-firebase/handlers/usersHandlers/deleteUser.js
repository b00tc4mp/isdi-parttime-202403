import { db } from '../../firebase.js'
// errors
import { NotFoundError, SystemError } from 'com/errors.js'

// Handler para eliminar un usuario por ID
const deleteUser = async (req, res) => {
    const userId = req.params.id
  
    try {
      const userRef = db.collection('users').doc(userId)
      const userDoc = await userRef.get()
  
      if (!userDoc.exists) { // Si no existe
        throw new NotFoundError('Usuario no encontrado')
      }
  
      // Extraer datos de usuario para incluirlo en el mensaje
      const { username, access } = userDoc.data() 
  
      await userRef.delete() // eliminar usuario
  
      console.log(`Usuario ${username}-${access} eliminado`)
      // Respuesta exitosa
      res.status(200).send(`Usuario ${username}-${access} eliminado`)
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
          error = new SystemError('Error al eliminar usuario')
      }
      next(error)
  }
}

  export default deleteUser
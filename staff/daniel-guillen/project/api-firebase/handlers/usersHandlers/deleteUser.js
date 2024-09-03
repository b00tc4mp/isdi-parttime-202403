import { db } from '../../firebase.js'

// Handler para eliminar un usuario por ID
const deleteUser = async (req, res) => {
    const userId = req.params.id
  
    try {
      const userRef = db.collection('users').doc(userId)
      const userDoc = await userRef.get()
  
       // Si no existe
      if (!userDoc.exists) {
        console.error('Usuario no encontrado')
        return res.status(404).send('Usuario no encontrado')
      }
  
      // Extraer username para incluirlo en el mensaje
      const { username } = userDoc.data() 
  
      await userRef.delete()
  
      // Mensaje
      console.log(`Usuario ${username} eliminado`)
      res.status(200).send(`Usuario ${username} eliminado`)
    } catch (error) {
      console.error('Error al eliminar usuario', error)
      res.status(500).send('Error al eliminar usuario')
    }
  }

  export default deleteUser
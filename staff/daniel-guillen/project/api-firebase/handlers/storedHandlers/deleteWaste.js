import { db } from '../../firebase.js'
// errors
import { NotFoundError, SystemError } from 'com/errors.js'

// Handler para eliminar un Residuo por ID
const deleteWaste = async (req, res, next) => {
    const wasteId = req.params.id
  
    try {
      const wasteRef = db.collection('storedWaste').doc(wasteId)
      const wasteDoc = await wasteRef.get()
  
      if (!wasteDoc.exists) { // Si no existe
        throw new NotFoundError('Residuo no encontrada')
      }
  
      // Extraer nombre de residuo para incluirlo en el mensaje
      const { description, code } = wasteDoc.data() 
  
      await wasteRef.delete() // eliminar residuo
  
      console.log(`Residuo ${code}-${description} eliminado`)
      // Respuesta exitosa
      res.status(200).send(`Residuo ${code}-${description} eliminado`)
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
          error = new SystemError('Error al eliminar residuo')
      }
      next(error)
  }
}

  export default deleteWaste
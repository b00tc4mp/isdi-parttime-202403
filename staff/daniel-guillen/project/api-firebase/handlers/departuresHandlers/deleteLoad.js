import { db } from '../../firebase.js'
// errors
import { NotFoundError, SystemError } from 'com/errors.js'

// Handler para eliminar un Residuo por ID
const deleteLoad = async (req, res, next) => {
    const wasteId = req.params.id
  
    try {
      const loadRef = db.collection('departures').doc(wasteId)
      const loadDoc = await loadRef.get()
  
      if (!loadDoc.exists) { // Si no existe
        throw new NotFoundError('Carga no encontrada')
      }
  
      // Extraer nombre de carga para incluirlo en el mensaje
      const { description, reference } = loadDoc.data()
  
      await loadRef.delete() // eliminar carga
  
      console.log(`Carga ${description}-${reference} eliminada`)
      // Respuesta exitosa
      res.status(200).send(`Carga ${description}-${reference} eliminada`)
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
          error = new SystemError('Error al eliminar carga')
      }
      next(error)
  }
}

  export default deleteLoad
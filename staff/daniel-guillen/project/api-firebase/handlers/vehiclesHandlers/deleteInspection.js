import { db } from '../../firebase.js'
import { NotFoundError, SystemError } from 'com/errors.js'

// Handler para eliminar una inspección por ID de firebase
const deleteInspection = async (req, res, next) => {
    const inspectionId = req.params.id
  
    try {
      const inspectionRef = db.collection('inspections').doc(inspectionId)
      const inspectionDoc = await inspectionRef.get()
  
      if (!inspectionDoc.exists) { // Si no existe
        throw new NotFoundError('Inspección no encontrada')
      }
  
      // extraer datos de vehicle y worker para incluir en mensaje
      const { vehicle, worker } = inspectionDoc.data()

      await inspectionRef.delete() // eliminar inspección
  
      console.log(`Inspección del vehículo ${vehicle.id} realizada por ${worker.workerName} eliminada`)
      // Respuesta exitosa
      res.status(200).send(`Inspección del vehículo ${vehicle.id} realizada por ${worker.workerName} eliminada`)
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
          error = new SystemError('Error al eliminar inspección')
      }
      next(error)
  }
}

export default deleteInspection

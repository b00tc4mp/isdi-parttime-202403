import { db } from '../../firebase.js'

// Handler para eliminar una inspección por ID de firebase
const deleteInspection = async (req, res) => {
    const inspectionId = req.params.id
  
    try {
      const inspectionRef = db.collection('inspections').doc(inspectionId)
      const inspectionDoc = await inspectionRef.get()
  
      // error si no existe la inspección
      if (!inspectionDoc.exists) {
        console.error('Inspección no encontrada')
        return res.status(404).json({ message: 'Inspección no encontrada' })
      }
  
      // extraer datos de vehicle y worker para incluir en mensaje
      const { vehicle, worker } = inspectionDoc.data()

      // eliminar la inspección
      await inspectionRef.delete()
  
      // mensaje después de la eliminación
      console.log(`Inspección del vehículo ${vehicle.id} realizada por ${worker.workerName} eliminada`)
      res.status(200).json({ message: `Inspección del vehículo ${vehicle.id} realizada por ${worker.workerName} eliminada` })
    } catch (error) {
      console.error('Error al eliminar inspección:', error)
      res.status(500).json({ message: 'Error al eliminar inspección' })
    }
  }

export default deleteInspection

import { db } from '../../firebase.js'

// Handler para eliminar un Residuo por ID
const deleteWaste = async (req, res) => {
    const wasteId = req.params.id
  
    try {
      const wasteRef = db.collection('storedWaste').doc(wasteId)
      const wasteDoc = await wasteRef.get()
  
       // Si no existe
      if (!wasteDoc.exists) {
        console.error('Residuo no encontrado')
        return res.status(404).send('Residuo no encontrado')
      }
  
      // Extraer nombre de residuo para incluirlo en el mensaje
      const { description } = wasteDoc.data() 
  
      await wasteRef.delete()
  
      // Mensaje
      console.log(`Residuo ${description} eliminado`)
      res.status(200).send(`Residuo ${description} eliminado`)
    } catch (error) {
      console.error('Error al eliminar residuo', error)
      res.status(500).send('Error al eliminar residuo')
    }
  }

  export default deleteWaste
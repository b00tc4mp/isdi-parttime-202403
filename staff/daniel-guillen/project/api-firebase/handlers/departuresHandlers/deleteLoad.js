import { db } from '../../firebase.js'

// Handler para eliminar un Residuo por ID
const deleteLoad = async (req, res) => {
    const wasteId = req.params.id
  
    try {
      const loadRef = db.collection('departures').doc(wasteId)
      const loadDoc = await loadRef.get()
  
       // Si no existe
      if (!loadDoc.exists) {
        console.error('Carga no encontrado')
        return res.status(404).send('Carga no encontrado')
      }
  
      // Extraer nombre de carga para incluirlo en el mensaje
      const { description } = loadDoc.data()
      const { reference } = loadDoc.data() 
  
      await loadRef.delete()
  
      // Mensaje
      console.log(`Carga ${description}-${reference} eliminada`)
      res.status(200).send(`Carga ${description}-${reference} eliminada`)
    } catch (error) {
      console.error('Error al eliminar carga', error)
      res.status(500).send('Error al eliminar carga')
    }
  }

  export default deleteLoad
import { db } from '../../firebase.js'

// Handler para obtener la carga filtrada por referencia
const getLoadByReference = async (req, res) => {
  try {
    const { reference } = req.params

    if (!reference || typeof reference !== 'string') {
      return res.status(400).json({ message: 'El campo "reference" es requerido' })
    }

    // Consultar documentos en 'departures' con la referencia específica
    const querySnapshot = await db.collection('departures')
      .where('reference', '==', reference)
      .get()

    if (querySnapshot.empty) {
      return res.status(404).json({ message: `No se encontraron documentos con la referencia: ${reference}` })
    }

    // Mapear los documentos obtenidos
    const storedLoads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log(`Documentos con referencia ${reference}:`, storedLoads)
    res.status(200).json(storedLoads)
  } catch (error) {
    console.error('Error al obtener la carga con referencia específica', error)
    res.status(500).json({ message: 'Error al obtener la carga con referencia específica' })
  }
}

export default getLoadByReference

import { db } from '../../firebase.js'

// Handler para obtener las inspecciones por matrícula
const getInspectionById = async (req, res) => {
  try {
    // obtener el parámetro 'id' directamente desde 'req.params'
    const { id } = req.params

    // validar que el campo 'id'
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'El campo "id" es requerido y debe ser una cadena de texto' })
    }

    // consultar documentos en la colección 'inspections' donde el 'vehicle.id' coincida
    const querySnapshot = await db.collection('inspections')
      .where('vehicle.id', '==', id) // usamos 'vehicle.id'
      .get()

    // si no se encuentran documentos
    if (querySnapshot.empty) {
      return res.status(404).json({ message: `No se encontraron documentos con la matrícula: ${id}` })
    }

    // mapear los documentos obtenidos
    const inspections = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(), // obtener todos los datos del documento
    }))

    console.log(`Documentos con matrícula ${id}:`, inspections)
    res.status(200).json(inspections) // respuesta con las inspecciones obtenidas
  } catch (error) {
    console.error('Error al obtener documentos con la matrícula específica:', error)
    res.status(500).json({ message: 'Error al obtener documentos con la matrícula específica' })
  }
}

export default getInspectionById

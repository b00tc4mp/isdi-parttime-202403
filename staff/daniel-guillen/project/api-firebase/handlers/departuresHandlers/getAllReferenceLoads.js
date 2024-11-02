import { db } from '../../firebase.js'
import { SystemError } from 'com/errors.js'

// Handler para obtener lista de referencias utilizadas en las cargas
const getAllReferenceLoads = async (req, res, next) => {
  try {
    const departuresCollection = db.collection('departures')
    const querySnapshot = await departuresCollection.get()

    if (querySnapshot.empty) {
      console.log('No se encontraron documentos en la colección departures.')
      return res.status(200).json([])
    }

    // Filtrar y mapear referencias, semana y año
    const references = querySnapshot.docs
      .map(doc => {
        const data = doc.data()
        if (data.reference && data.week && data.year) {
          return { reference: data.reference, week: data.week, year: data.year }
        }
        return null
      })
      .filter(Boolean)

    if (references.length === 0) {
      console.log('No se encontraron referencias válidas en los documentos de la colección departures.')
      return res.status(200).json([])
    }

    // Filtrar referencias únicas
    const uniqueReferences = references.reduce((acc, current) => {
      const isDuplicate = acc.some(
        item => item.reference === current.reference && item.week === current.week && item.year === current.year
      )
      if (!isDuplicate) acc.push(current)
      return acc
    }, [])

    console.log('Lista de referencias:', uniqueReferences)
    // Respuesta exitosa
    res.status(200).json(uniqueReferences)
  } catch (error) {
    next(new SystemError('Error al obtener las referencias'))
  }

}

export default getAllReferenceLoads
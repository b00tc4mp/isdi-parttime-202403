import { db } from '../../firebase.js'
// validation errors
import validate from 'com/validate/validateStored.js'
import { SystemError, ContentError } from 'com/errors.js'

// Handler para obtener lista de códigos de residuos almacenados durante mes y año actual
const getAllCodesStored = async (req, res, next) => {
  try {
    const { month, year } = req.params

    // Validar los datos
    try {
      validate.month(month)
      validate.year(year)
    } catch (validationError) {
      return next(new ContentError(validationError.message))
    }

    // Consultamos documentos en 'storedWaste' del mes y año actual
    const filterQuerySnapshot = await db.collection('storedWaste')
      .where('month', '==', month)
      .where('year', '==', year)
      .get()

    if (filterQuerySnapshot.empty) {
      console.log('No se encontraron documentos para el mes y año proporcionados.')
      return res.status(200).json([]) // Devuelve array vacío si no hay resultados
    }
   
    // Buscamos códigos y descripciones de los documentos y los guardamos en un array
    const codeDescriptions = filterQuerySnapshot.docs.map(doc => ({
      code: doc.data().code,
      description: doc.data().description
    }))

    // Traemos uno por cada código diferente
    const uniqueCodeDescriptions = Array.from(new Set(codeDescriptions.map(item => item.code)))
      .map(code => {
        return codeDescriptions.find(item => item.code === code)
      })

    console.log('Lista de códigos y descripciones:', uniqueCodeDescriptions)
    // Respuesta exitosa
    res.status(200).json(uniqueCodeDescriptions)
  } catch (error) {
    next(new SystemError('Error al obtener lista de códigos almacenados'))
  }
}

export default getAllCodesStored
import { db } from '../../firebase.js'
// validation errors
import validate from 'com/validate/validateStored.js'
import { ContentError, SystemError } from 'com/errors.js'

// Handler para obtener los residuos de un codigo especifico de mes y año actual
const getWasteStoredByCode = async (req, res, next) => {
  try {
    const { month, year, code } = req.params
 
    // Validar los datos del residuo
    try {
      validate.code(code)
      validate.month(month)
      validate.year(year)
    } catch (validationError) {
      return next(new ContentError(validationError.message))
    }

    // consultamos documentos en 'storedWaste' del mes, año y codigo
    const querySnapshot = await db.collection('storedWaste')
      .where('month', '==', month)
      .where('year', '==', year)
      .where('code', '==', code)
      .get()

    if (querySnapshot.empty) {
      // return next(new NotFoundError(`No se encontraron documentos con el mes: ${month}, año ${year} y codigo ${code}.`))
      console.log(`No se encontraron documentos con el mes: ${month}, año ${year} y código ${code}.`)
      return res.status(200).json([])
    }
    // Mapear los documentos obtenidos
    const wasteStoredList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log(`Documentos con el mes ${month} y año ${year}:`, wasteStoredList)
    // Respuesta exitosa
    return res.status(200).json(wasteStoredList)
  } catch (error) {
    next(new SystemError('Error al obtener los residuos solicitados'))
  }
}

export default getWasteStoredByCode
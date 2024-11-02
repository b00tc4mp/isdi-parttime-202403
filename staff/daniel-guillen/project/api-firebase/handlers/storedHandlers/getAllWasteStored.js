import { db } from '../../firebase.js'
// validation errors
import validate from 'com/validate/validateStored.js'
import { ContentError, SystemError } from 'com/errors.js'

// Handler para obtener los residuos almacenados actualmente
const getAllWasteStored = async (req, res, next) => {
  try {
    const { month, year } = req.params
 
    // Validar los datos del residuo
    try {
      validate.month(month)
      validate.year(year)
    } catch (validationError) {
      return next(new ContentError(validationError.message))
    }

    // consultamos documentos en 'storedWaste' del mes y año
    const querySnapshot = await db.collection('storedWaste')
      .where('month', '==', month)
      .where('year', '==', year)
      .get()

    if (querySnapshot.empty) {
      console.log(`No se encontraron documentos con el mes: ${month} y año ${year}.`)
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

export default getAllWasteStored

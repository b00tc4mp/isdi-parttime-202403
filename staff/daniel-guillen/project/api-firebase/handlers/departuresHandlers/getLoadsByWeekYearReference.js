import { db } from '../../firebase.js'
// validation errors
import validate from 'com/validate/validateDepartures.js'
import { ContentError, SystemError } from 'com/errors.js'

// Handler para obtener la carga filtrada por semana, año actual y referencia
const getLoadsByWYR = async (req, res, next) => {
  try {
    const { week, year, reference } = req.params

      // Validar los datos del residuo
      try {
        validate.reference(reference)
        validate.week(week)
        validate.year(year)
      } catch (validationError) {
        return next(new ContentError(validationError.message))
      }

    // consultamos documentos en 'departures' con semana, año actual y referencia
    const querySnapshot = await db.collection('departures')
      .where('week', '==', week)
      .where('year', '==', year)
      .where('reference', '==', reference)
      .get()

    if (querySnapshot.empty) {
      console.log(`No se encontraron documentos con la semana: ${week}, año ${year} y referencia ${reference}.`)
      return res.status(200).json([])
    }

    // Mapear los documentos obtenidos
    const storedLoads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log(`Documentos con semana ${week} y año ${year}:`, storedLoads)
    // Respuesta exitosa
    return res.status(200).json(storedLoads)
  } catch (error) {
    next(new SystemError('Error al obtener los residuos solicitados'))
  }
}

export default getLoadsByWYR
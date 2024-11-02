import { db } from '../../firebase.js'
// validation errors
import validate from '../../../com/validate/validateDepartures.js'
import { ContentError } from 'com/errors.js'

const createLoad = async (req, res, next) => {
  try {
    const { code, container, description, reference, weight, week, year } = req.body

    // Validar los datos del residuo
    try {
      validate.code(code)
      validate.container(container)
      validate.description(description)
      validate.reference(reference)
      validate.weight(weight)
      validate.week(week)
      validate.year(year)
    } catch (validationError) {
      return next(new ContentError(validationError.message))
    }

    // Crear el objeto de carga
    const newLoad = { code, container, description, reference, weight, week, year }

    // Guardar en la base de datos (Firebase)
    const LoadRef = await db.collection('departures').add(newLoad)

    console.log(`Carga registrada: ${code}-${description}-${reference}`)
    // Respuesta exitosa
    res.status(201).json({
      message: 'Nueva carga registrada',
      LoadId: LoadRef.id,
      code: newLoad.code,
      description: newLoad.description,
      reference: newLoad.reference,
    })
  } catch (error) {
    next(error)
  }
}

export default createLoad
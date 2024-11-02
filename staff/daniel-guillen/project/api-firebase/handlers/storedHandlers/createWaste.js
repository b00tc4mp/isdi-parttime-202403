import { db } from '../../firebase.js'
// validation errors
import validate from '../../../com/validate/validateStored.js'
import { ContentError } from 'com/errors.js'

const createWaste = async (req, res, next) => { // Handler para crear un residuo almacenado
  try {
    const { code, container, description, status, weight, month, year } = req.body

    try { // Validar los datos del residuo
      validate.code(code)
      validate.container(container)
      validate.description(description)
      validate.status(status)
      validate.weight(weight)
      validate.month(month)
      validate.year(year)
    } catch (validationError) {
      return next(new ContentError(validationError.message))
    }

    // Crear el objeto de residuo
    const newWaste = { code, container, description, status, weight, month, year }

    // Guardar en la base de datos (Firebase)
    const wasteRef = await db.collection('storedWaste').add(newWaste)

    console.log(`Residuo registrado: ${code} - ${description}`)
    // Respuesta exitosa
    res.status(201).json({
      message: 'Nuevo residuo registrado',
      WasteId: wasteRef.id,
      code: newWaste.code,
      description: newWaste.description,
      container: newWaste.container
    })
  } catch (error) {
    next(error)
  }
}

export default createWaste
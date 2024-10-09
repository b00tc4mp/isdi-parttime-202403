import { db } from '../../firebase.js'
import validateLoadData from '../../../com/validate/validateLoadData.js'

const createLoad = async (req, res) => { // Handler para crear un residuo cargado
  try {
    const { code, container, description, reference, weight, week, year } = req.body

    const { isValid, errors } = validateLoadData({ code, container, description, reference, weight, week, year })

    if (!isValid) {
      console.log('Errores de validación:', errors)
      return res.status(400).json({ message: errors.join(', ') })
    }

    const newLoad = { code, container, description, reference, weight, week, year } // Estructura del nuevo residuo

    const LoadRef = await db.collection('departures').add(newLoad) // Agregar el nuevo residuo a la colección 'departures'

    console.log(`Carga registrada: ${code}-${description}-${reference}`)

    res.status(201).json({    // Respuesta exitosa
      message: 'Nueva carga registrada',
      LoadId: LoadRef.id,
      code: newLoad.code,
      description: newLoad.description,
      reference: newLoad.reference,
    })
  } catch (error) {
    console.error('Error al registrar residuo', error)
    res.status(500).json({ message: 'Error al registrar residuo' })
  }
}

export default createLoad
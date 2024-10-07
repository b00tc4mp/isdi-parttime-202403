import { db } from '../../firebase.js'
import validateWasteData from '../../../com/validate/validateWasteData.js'

const createWaste = async (req, res) => { // Handler para crear un residuo almacenado
  try {
    const { code, container, description, status, weight, month, year } = req.body

    const { isValid, errors } = validateWasteData({ code, container, description, status, weight, month, year })

    if (!isValid) {
      console.log('Error de validación:', errors)
      return res.status(400).json({ message: errors.join(', ') })
    }1

    const newWaste = { code, container, description, status, weight, month, year } // Estructura del nuevo residuo

    const wasteRef = await db.collection('storedWaste').add(newWaste) // Agregar el nuevo residuo a la colección 'storedWaste'

    console.log(`Residuo registrado: ${code} - ${description}`)

    res.status(201).json({ // Respuesta exitosa
      message: 'Nuevo residuo registrado',
      WasteId: wasteRef.id,
      code: newWaste.code,
      description: newWaste.description,
      container: newWaste.container
    })
  } catch (error) {
    console.error('Error al registrar residuo', error)
    res.status(500).json({ message: 'Error al registrar residuo' })
  }
}

export default createWaste
import { db } from '../../firebase.js'

// Handler para crear un residuo almacenado
const createWaste = async (req, res) => {
  try {
    const { code, container, description, status, weight, month, year } = req.body

    // Validar que todos las entradas esten completadas correctamente
    if (!code || typeof code !== 'string') {
      console.log('Error: El campo "code" es requerido.')
      return res.status(400).json({ message: 'El campo "code" es requerido.' })
    }

    if (!['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200'].includes(container)) {
      console.log('Error: El campo "container" debe ser uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.')
      return res.status(400).json({ message: 'El campo "container" debe ser uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.' })
    }
    if (!description || typeof description !== 'string') {
      console.log('Error: El campo "description" es requerido.')
      return res.status(400).json({ message: 'El campo "description" es requerido.' })
    }
    if (!status || typeof status !== 'string') {
      console.log('Error: El campo "status" es requerido.')
      return res.status(400).json({ message: 'El campo "status" es requerido.' })
    }
    
    if (status !== 'CORRECTO' && status !== 'ESTANCADO') {
      console.log('Error: El campo "status" debe ser "CORRECTO" o "ESTANCADO".')
      return res.status(400).json({ message: 'El campo "status" debe ser "CORRECTO" o "ESTANCADO".' })
    }

    if (weight == null || typeof weight !== 'string' || !/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
      console.log('Error: El campo "weight" es requerido: de 1 a 4 dígitos y su valor debe estar entre 5 y 1500.');
      return res.status(400).json({ message: 'El campo "weight" es requerido: de 1 a 4 dígitos y su valor debe estar entre 5 y 1500.' });
    }
    
    if (!month || typeof month !== 'string' || !/^(0[1-9]|1[0-2])$/.test(month)) {
      console.log('Error: El campo "month" es requerido con un valor entre "01" y "12".')
      return res.status(400).json({ message: 'El campo "month" es requerido con un valor entre "01" y "12".' })
    }
    if (year == null || typeof year !== 'string' || !/^\d{4}$/.test(year) || year < '2024' || year > '2099') {
      console.log('Error: El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").')
      return res.status(400).json({ message: 'El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").' })
    }
    

    // Estructura del nuevo residuo
    const newWaste = {
      code,
      container,
      description,
      status,
      weight,
      month,
      year
    }

    // Agregar el nuevo residuo a la colección 'storedWaste'
    const wasteRef = await db.collection('storedWaste').add(newWaste)

    console.log(`Residuo registrado: ${code} - ${description}`)

    // Respuesta exitosa
    res.status(201).json({
      message: 'Nuevo residuo registrado',
      WasteId: wasteRef.id,
      code: newWaste.code,
      description: newWaste.description
    })
  } catch (error) {
    console.error('Error al registrar residuo', error)
    res.status(500).json({ message: 'Error al registrar residuo' })
  }
}

export default createWaste

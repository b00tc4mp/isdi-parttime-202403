import { db } from '../../firebase.js'

// Handler para crear un residuo cargado
const createLoad = async (req, res) => {
  try {
    const { code, container, description, reference, weight, week, year } = req.body

    // Validar que todos las entradas esten completadas correctamente
    if (!code || typeof code !== 'string') {
      console.log('Error: El campo "code" es requerido.')
      return res.status(400).json({ message: 'El campo "code" es requerido.' })
    }
    // if (!container || typeof container !== 'string') {
    //   console.log('Error: El campo "container" es requerido.')
    //   return res.status(400).json({ message: 'El campo "container" es requerido.' })
    // }
    if (!['PALET', 'GRG', 'BIGBAG', 'B200', 'B-200'].includes(container)) {
      console.log('Error: El campo "container" debe ser uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.')
      return res.status(400).json({ message: 'El campo "container" debe ser uno de los siguientes valores: PALET, GRG, BIGBAG, B200, B-200.' })
    }
    if (!description || typeof description !== 'string') {
      console.log('Error: El campo "description" es requerido.')
      return res.status(400).json({ message: 'El campo "description" es requerido.' })
    }
    
    // añadir una referencia personalizada para localizarlo
    if (!reference || typeof reference !== 'string') {
      console.log('Error: El campo "reference" es requerido.')
      return res.status(400).json({ message: 'El campo "reference" es requerido.' })
    }

    if (weight == null || typeof weight !== 'string' || !/^\d{1,4}$/.test(weight) || Number(weight) < 5 || Number(weight) > 1500) {
      console.log('Error: El campo "weight" es requerido: de 1 a 4 dígitos y su valor debe estar entre 5 y 1500.');
      return res.status(400).json({ message: 'El campo "weight" es requerido: de 1 a 4 dígitos y su valor debe estar entre 5 y 1500.' });
    }
    if (!week || typeof week !== 'string' || !/^(0[1-9]|[1-4][0-9]|5[0-3])$/.test(week)) {
      console.log('Error: El campo "week" es requerido con un valor entre "01" y "53".')
      return res.status(400).json({ message: 'El campo "week" es requerido con un valor entre "01" y "53".' })
    }
    if (year == null || typeof year !== 'string' || !/^\d{4}$/.test(year) || year < '2024' || year > '2099') {
      console.log('Error: El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").')
      return res.status(400).json({ message: 'El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").' })
    }
    

    // Estructura del nuevo residuo
    const newLoad = {
      code,
      container,
      description,
      reference,
      weight,
      week,
      year
    }

    // Agregar el nuevo residuo a la colección 'departures'
    const LoadRef = await db.collection('departures').add(newLoad)

    console.log(`Carga registrada: ${code}-${description}-${reference}`)

    // Respuesta exitosa
    res.status(201).json({
      message: 'Nueva carga registrada',
      LoadId: LoadRef.id,
      code: newLoad.code,
      description: newLoad.description,
      reference: newLoad.reference
    })
  } catch (error) {
    console.error('Error al registrar residuo', error)
    res.status(500).json({ message: 'Error al registrar residuo' })
  }
}

export default createLoad

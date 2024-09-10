import { db } from '../../firebase.js'

// Handler para obtener los residuos de un codigo especifico de mes y año actual
const getWasteStored = async (req, res) => {
  try {
    const { month, year, code } = req.params

    // Validar mes
    if (!month || typeof month !== 'string' || !/^(0[1-9]|1[0-2])$/.test(month)) {
      console.log('Error: El campo "month" es requerido con un valor entre "01" y "12".')
      return res.status(400).json({ message: 'El campo "month" es requerido con un valor entre "01" y "12".' })
    }

    // Validar año
    const yearAsNumber = Number(year)
    if (isNaN(yearAsNumber) || yearAsNumber < 2024 || yearAsNumber > 2099) {
      console.log('Error: El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").')
      return res.status(400).json({ message: 'El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").' })
    }

    if (!code || typeof code !== 'string') {
      console.log('Error: El campo "code" es requerido.')
      return res.status(400).json({ message: 'El campo "code" es requerido.' })
    }

    // consultamos documentos en 'storedWaste' del mes, año y referencia
    const querySnapshot = await db.collection('storedWaste')
      .where('month', '==', month)
      .where('year', '==', year)
      .where('code', '==', code)
      .get()

    if (querySnapshot.empty) {
      console.log(`No se encontraron documentos con el mes: ${month}, año ${year} y referencia ${code}.`)
      return res.status(404).json({ message: `No se encontraron documentos con el mes: ${month}, año ${year} y referencia ${code}.` })
    }

    // Mapear los documentos obtenidos
    const storedLoads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log(`Documentos con el mes ${month} y año ${year}:`, storedLoads)
    return res.status(200).json(storedLoads)
  } catch (error) {
    console.error('Error al obtener los residuos solicitados:', error)
    return res.status(500).json({ message: 'Error al obtener los residuos solicitados' })
  }
}

export default getWasteStored

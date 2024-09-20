import { db } from '../../firebase.js'
import getWeekNumberYear from './getWeekNumberYear.js'

const { week, year } = getWeekNumberYear()

// Handler para obtener la carga filtrada por semana, año actual y referencia
const getLoadsByWYR = async (req, res) => {
  try {
    const { week, year, reference } = req.params

    // Validar semana (numeros entre 01 y 53)
    if (!week || typeof week !== 'string' || !/^(0[1-9]|[1-4][0-9]|5[0-3])$/.test(week)) {
      console.log('Error: El campo "week" es requerido con un valor entre "01" y "53".')
      return res.status(400).json({ message: 'El campo "week" es requerido con un valor entre "01" y "53".' })
    }

    // Validar año (4 digitos)
    const yearAsNumber = Number(year)
    if (isNaN(yearAsNumber) || yearAsNumber < 2024 || yearAsNumber > 2099) {
      console.log('Error: El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").')
      return res.status(400).json({ message: 'El campo "year" es requerido: 4 dígitos (Ejemplo: "2024").' })
    }

    if (!reference || typeof reference !== 'string') {
      return res.status(400).json({ message: 'El campo "reference" es requerido' })
    }

    // consultamos documentos en 'departures' con semana, año actual y referencia
    const querySnapshot = await db.collection('departures')
      .where('week', '==', week)
      .where('year', '==', year)
      .where('reference', '==', reference)
      .get()

    if (querySnapshot.empty) {
      console.log(`No se encontraron documentos con la semana: ${week}, año ${year} y referencia ${reference}.`)
      return res.status(404).json({ message: `No se encontraron documentos con la semana: ${week}, año ${year} y referencia ${reference}.` })
    }

    // Mapear los documentos obtenidos
    const storedLoads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log(`Documentos con semana ${week} y año ${year}:`, storedLoads)
    return res.status(200).json(storedLoads)
  } catch (error) {
    console.error('Error al obtener la carga solicitada:', error)
    return res.status(500).json({ message: 'Error al obtener la carga solicitada' })
  }
}

export default getLoadsByWYR

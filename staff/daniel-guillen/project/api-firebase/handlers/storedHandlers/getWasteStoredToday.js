import { db } from '../../firebase.js'

// Handler para obtener los residuos almacenados actualmente
const getWasteStoredToday = async (req, res) => {
  try {

    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())

    // consultamos residuos en 'storedWaste' del mes, año actual
    const querySnapshot = await db.collection('storedWaste')
      .where('month', '==', month)
      .where('year', '==', year)
      .get()

    if (querySnapshot.empty) {
      console.log(`No se encontraron documentos con el mes: ${month}, año ${year}.`)
      // return res.status(200).json({ message: `No se encontraron documentos con el mes: ${month}, año ${year}.` })
      return res.status(200).json([])
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

export default getWasteStoredToday

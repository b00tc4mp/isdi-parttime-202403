import { db } from '../../firebase.js'

// Handler para obtener toda la carga
const getAllLoad = async (req, res) => {
  try {
    const querySnapshot = await db.collection('departures').get()
    const departures = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log('Lista de residuos cargados:', departures)
    res.status(200).json(departures)
  } catch (error) {
    console.error('Error al obtener residuos cargados', error)
    res.status(500).json({ message: 'Error al obtener residuos cargados' })
  }
}

export default getAllLoad
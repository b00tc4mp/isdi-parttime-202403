import { db } from '../../firebase.js'

// Handler para obtener todos los residuos
const getAllWasteStored = async (req, res) => {
  try {
    const querySnapshot = await db.collection('StoredWaste').get()
    const stored = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log('Lista de residuos almacenados:', stored)
    res.status(200).json(stored)
  } catch (error) {
    console.error('Error al obtener residuos almacenados', error)
    res.status(500).json({ message: 'Error al obtener residuos almacenados' })
  }
}

export default getAllWasteStored
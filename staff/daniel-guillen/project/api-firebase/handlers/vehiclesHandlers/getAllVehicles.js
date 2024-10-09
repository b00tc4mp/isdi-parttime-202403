import { db } from '../../firebase.js'

// Handler para obtener toda la carga
const getAllVehicles = async (req, res) => {
  try {
    const querySnapshot = await db.collection('vehicles').get()
    const vehicles = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    console.log('Lista de vehiculos:', vehicles)
    res.status(200).json(vehicles)
  } catch (error) {
    console.error('Error al obtener vehiculos', error)
    res.status(500).json({ message: 'Error al obtener vehiculos' })
  }
}

export default getAllVehicles
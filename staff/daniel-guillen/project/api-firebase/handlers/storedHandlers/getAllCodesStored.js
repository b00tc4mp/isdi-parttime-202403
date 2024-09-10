import { db } from '../../firebase.js'

const getAllCodesStored = async (req, res) => {
  try {
    const storedLoadsCollection = db.collection('storedLoads') // accedemos a 'storedLoads'
    
    const querySnapshot = await storedLoadsCollection.get() // sacamos todos los documentos de 'storedLoads'

    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = String(today.getFullYear())

    // consultamos documentos en 'storedWaste' del mes, año actual
    const filterQuerySnapshot = await db.collection('storedWaste')
      .where('month', '==', month)
      .where('year', '==', year)
      .get()

    // buscamos códigos y descripciones de los documentos y los guardamos en un array
    const codeDescriptions = filterQuerySnapshot.docs.map(doc => ({
      code: doc.data().code,
      description: doc.data().description
    }))

    // Traemos un por cada codigo diferente
    const uniqueCodeDescriptions = Array.from(new Set(codeDescriptions.map(item => item.code)))
      .map(code => {
        return codeDescriptions.find(item => item.code === code)
      })

    // Devuelve la lista de códigos junto con sus descripciones
    console.log('Lista de códigos y descripciones:', uniqueCodeDescriptions)
    res.status(200).json(uniqueCodeDescriptions)
  } catch (error) {
    console.error('Error al obtener lista de códigos y descripciones:', error)
    res.status(500).json({ error: 'Error al obtener lista de códigos y descripciones' })
  }
}

export default getAllCodesStored


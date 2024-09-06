// import { db } from '../../firebase.js'

// // funcion para obtener todas las referencias
// const getAllReferenceLoads = async () => {
//   try {
//     const departuresCollection = db.collection('departures') // accedemos a 'departures'
//     const querySnapshot = await departuresCollection.get() // traemos todos los documentos de 'departures'

//     // Extraemos las referencias de los documentos y las guardamos en un array
//     const references = querySnapshot.docs.map((doc) => doc.data().reference)

//     // Filtramos referencias
//     const uniqueReferences = [...new Set(references)]

//     return uniqueReferences // Devolvemos las referencias unicas
//   } catch (error) {
//     console.error('Error al obtener las referencias:', error)
//     throw new Error('Error al obtener las referencias')
//   }
// }

// export default getAllReferenceLoads

import { db } from '../../firebase.js';

const getAllReferenceLoads = async (req, res) => {
  try {
    const departuresCollection = db.collection('departures'); // Accede a la colección 'departures'
    const querySnapshot = await departuresCollection.get(); // Obtiene todos los documentos de 'departures'

    // Extrae las referencias de los documentos y las guarda en un array
    const references = querySnapshot.docs.map(doc => doc.data().reference);

    // Filtra referencias únicas
    const uniqueReferences = [...new Set(references)];

    // Devuelve las referencias únicas
    console.log('Lista de referencia:', uniqueReferences)
    res.status(200).json(uniqueReferences);
  } catch (error) {
    console.error('Error al obtener las referencias:', error);
    res.status(500).json({ error: 'Error al obtener las referencias' });
  }
};

export default getAllReferenceLoads;

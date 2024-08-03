import logic from '../logic/index.js'

export default (req, res, next) => {
  const { city, discipline } = req.params // Extrae el parámetro `city` de la URL

  logic
    .getArtistsByCity(city, discipline) // Llama a la función lógica
    .then((artistsList) => {
      res.json(artistsList) // Envía la lista de artistas como respuesta
    })
    .catch((error) => {
      next(error) // Pasa el error al manejador de errores de Express
    })
}

import fs from 'fs';
import errors from 'com/errors.js';

const { SystemError } = errors;

const deletePost = (condition, callback) => {
  // Lee el contenido del archivo "./data/posts.json" en formato UTF-8
  fs.readFile("./data/posts.json", "utf8", (error, postsJson) => {
    // Maneja errores durante la lectura del archivo
    if (error) {
      callback(new SystemError(error.message)); // Llama al callback con un error SystemError
      return;
    }

    // Si no hay contenido en el archivo, inicializa postsJson como un array vacío en formato JSON
    if (!postsJson) postsJson = "[]";

    // Convierte el contenido de postsJson de formato JSON a un array de objetos "posts"
    const posts = JSON.parse(postsJson);

    // Busca el índice del primer elemento que cumple con la condición proporcionada
    const index = posts.findIndex(condition);

    // Si se encuentra un post que cumple la condición
    if (index > -1) { // -1 significa que no hay coincidencias
      // Elimina el post encontrado del array "posts" y guarda el post eliminado en deletedPost
      const deletedPost = posts.splice(index, 1)[0];

      // Convierte el array "posts" actualizado a formato JSON
      const newJson = JSON.stringify(posts);

      // Escribe el nuevo contenido JSON en el archivo "./data/posts.json"
      fs.writeFile("./data/posts.json", newJson, (error) => {
        // Maneja errores durante la escritura en el archivo
        if (error) {
          callback(new SystemError(error.message)); // Llama al callback con un error SystemError
          return;
        }
        // Llama al callback con null (sin error) y el post eliminado
        callback(null, deletedPost);
      });

    } else {
      // Llama al callback con null si no se encontraron posts que cumplan la condición
      callback(null); // no hay coincidencias
    }
  });
}

export default deletePost;

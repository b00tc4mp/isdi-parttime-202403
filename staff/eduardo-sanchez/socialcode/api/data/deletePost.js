import fs from 'fs';
import { SystemError } from 'com/errors.js'; // Asegúrate de que la ruta sea correcta

const deletePost = (condition, callback) => {
    fs.readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(new SystemError(error.message));
            return;
        }

        if (!json) json = '[]';

        const posts = JSON.parse(json);

        const index = posts.findIndex(condition);

        if (index > -1) {
            const deletedPost = posts.splice(index, 1)[0]; // Elimina y guarda el post eliminado

            const newJson = JSON.stringify(posts, null, 2); // Indentación de 2 espacios para legibilidad

            fs.writeFile('./data/posts.json', newJson, error => {
                if (error) {
                    callback(new SystemError(error.message));
                    return;
                }

                callback(null, deletedPost); // Llama al callback con el post eliminado
            });
        } else {
            callback(null, null); // Llama al callback con null si no se encontró ningún post para eliminar
        }
    });
}

export default deletePost;

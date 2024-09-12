import { Router } from 'express'
import getAllUsers from '../handlers/usersHandlers/getAllUsers.js'
import getUserName from '../handlers/usersHandlers/getUsername.js'
import createUser from '../handlers/usersHandlers/createUser.js'
import deleteUser from '../handlers/usersHandlers/deleteUser.js'
import loginUser from '../handlers/usersHandlers/loginUser.js'

const userRoutes = Router()

// Ruta para obtener todos los usuarios
userRoutes.get('/getAllUsers', getAllUsers)

// Ruta para obtener nombre y nivel de acceso
userRoutes.get('/getUserName', getUserName)

// Ruta para crear un nuevo usuario
userRoutes.post('/createUser', createUser)

// Ruta para eliminar un usuario por ID
userRoutes.delete('/deleteUser/:id', deleteUser)

// Ruta para iniciar sesión
userRoutes.post('/login', loginUser)

export default userRoutes


import 'dotenv/config'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import { CredentialsError, SystemError } from 'com/errors.js'
import mongoose from 'mongoose'

import jwt from './util/jsonwebtoken-promised.js'

import handleErrorResponse from './helper/handleErrorResponse.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(express.static('public'))
        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        // Middleware de verificación de token
        const verifyToken = (req, res, next) => {
            try {
                const token = req.headers.authorization?.slice(7);
                if (!token) {
                    throw new CredentialsError('No token provided');
                }
                jwt.verify(token, JWT_SECRET)
                    .then(payload => {
                        req.userId = payload.sub;
                        next();
                    })
                    .catch(error => handleErrorResponse(new CredentialsError(error.message), res));
            } catch (error) {
                handleErrorResponse(error, res);
            }
        }

        // Registro de usuario
        api.post('/users', jsonBodyParser, (req, res) => {
            const { name, surname, email, username, password, passwordRepeat } = req.body;

            logic.registerUser(name, surname, email, username, password, passwordRepeat)
                .then(() => res.status(201).send())
                .catch(error => handleErrorResponse(error, res));
        });

        // Autenticación de usuario
        api.post('/users/auth', jsonBodyParser, (req, res) => {
            const { username, password } = req.body;

            logic.authenticateUser(username, password)
                .then(userId =>
                    jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: '1h' })
                        .then(token => res.json(token))
                        .catch(error => handleErrorResponse(new SystemError(error.message), res))
                )
                .catch(error => handleErrorResponse(error, res));
        });

        // Obtener nombre de usuario
        api.get('/users/:targetUserId', verifyToken, (req, res) => {
            const { targetUserId } = req.params;

            logic.getUserName(req.userId, targetUserId)
                .then(name => res.json(name))
                .catch(error => handleErrorResponse(error, res));
        });

        // Obtener todos los posts
        api.get('/posts', verifyToken, (req, res) => {
            logic.getAllPosts(req.userId)
                .then(posts => res.json(posts))
                .catch(error => handleErrorResponse(error, res));
        });

        // Crear un nuevo post
        api.post('/posts', jsonBodyParser, verifyToken, (req, res) => {
            const { title, image, description } = req.body;

            logic.createPost(req.userId, title, image, description)
                .then(() => res.status(201).send())
                .catch(error => handleErrorResponse(error, res));
        });

        // Eliminar un post
        api.delete('/posts/:postId', verifyToken, (req, res) => {
            const { postId } = req.params;

            logic.deletePost(req.userId, postId)
                .then(() => res.status(204).send())
                .catch(error => handleErrorResponse(error, res));
        });

        // Alternar like en un post
        api.patch('/posts/:postId/likes', verifyToken, (req, res) => {
            const { postId } = req.params;

            logic.toggleLikePost(req.userId, postId)
                .then(() => res.status(204).send())
                .catch(error => handleErrorResponse(error, res));
        });

        // Middleware global de manejo de errores
        api.use((err, req, res, next) => {
            handleErrorResponse(err, res);
        });

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`));
    })
    .catch(error => console.error(error));

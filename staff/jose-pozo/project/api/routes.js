import express from 'express'
import routes from './handlers/index.js'

const jsonBodyParser = express.json({ strict: true, type: "application/json" })

const router = express.Router()

router.post("/users", jsonBodyParser, routes.registerUserHandler)

router.post("/users/auth", jsonBodyParser, routes.authenticateUserHandler)

export default router




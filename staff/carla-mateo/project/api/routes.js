import express from 'express'
import routes from './handlers/index.js'

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

const router = express.Router()

router.post('/users', jsonBodyParser, routes.registerUserHandler)
router.post('/admin', jsonBodyParser, routes.registerAdminHandler)
router.post('/users/auth', jsonBodyParser, routes.authenticateAdminHandler)

router.get("/users/:targetUserId", routes.getUserNameHandler)

export default router
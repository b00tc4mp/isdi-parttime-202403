import express from 'express'
import routes from './handlers/index.js'

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

const router = express.Router()

router.post('/users', jsonBodyParser, routes.registerUserHandler)
router.post('/users/auth', jsonBodyParser, routes.authenticateUserHandler)

router.post('/users/customers', jsonBodyParser, routes.createCustomerHandler)

router.delete('/users/:targetUserId', routes.deleteCustomerHandler)

router.get('/users/:targetUserId', routes.getUserNameHandler)
router.get('/users/:targetUserId/profile', routes.getUserProfileHandler)
router.get('/users', routes.getAllCustomersHandler)


export default router




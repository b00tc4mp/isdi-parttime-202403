import express from 'express'
import routes from './handlers/index.js'

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

const router = express.Router()

router.post('/users', jsonBodyParser, routes.registerUserHandler)
router.post('/users/auth', jsonBodyParser, routes.authenticateUserHandler)

router.post('/users/customers', jsonBodyParser, routes.createCustomerHandler)
router.post('/users/services', jsonBodyParser, routes.addServiceHandler)

router.delete('/users/:customerId', routes.deleteCustomerHandler)
router.delete('/services/:serviceId', routes.deleteServiceHandler)

router.get('/users/:targetUserId', routes.getUserNameHandler)
router.get('/users/:targetUserId/profile', routes.getUserProfileHandler)
router.get('/customers', routes.getAllCustomersHandler)
router.get('/services', routes.getAllServicesHandler)

router.patch('/users/:customerId', jsonBodyParser, routes.updateCustomerHandler)
router.patch('/services/:serviceId', jsonBodyParser, routes.updateServiceHandler)


export default router




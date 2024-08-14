import express from 'express'
import routes from './handlers/index.js'

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

const router = express.Router()

router.post('/users', jsonBodyParser, routes.registerUserHandler)
router.post('/admin', jsonBodyParser, routes.registerAdminHandler)
router.post('/users/auth', jsonBodyParser, routes.authenticateAdminHandler)
router.post('/createtask', jsonBodyParser, routes.createTaskHandler)

router.delete('/task/:taskId', routes.deleteTaskHandler)

router.get("/users/:targetUserId", routes.getUserNameHandler)
router.get('/getallusers', routes.getAllUsersHandler)
router.get('/getalltasks', routes.getAllTasksHandler)

export default router
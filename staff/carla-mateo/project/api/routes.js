import express from 'express'
import routes from './handlers/index.js'

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

const router = express.Router()

router.post('/users', jsonBodyParser, routes.registerUserHandler)
router.post('/admin', jsonBodyParser, routes.registerAdminHandler)
router.post('/users/auth', jsonBodyParser, routes.authenticateAdminHandler)
router.post('/createtask', jsonBodyParser, routes.createTaskHandler)

router.delete('/task/:taskId', routes.deleteTaskHandler)
router.delete('/profile/:userId', routes.deleteUserHandler)

router.get('/users/:targetUserId', routes.getUsernameHandler)
router.get('/getallusers', routes.getAllUsersHandler)
router.get('/getalltasks', routes.getAllTasksHandler)
router.get('/getTasks/:date', routes.getTasksForDateHandler)


router.get('/taskDay/:selectedDate', routes.taskDayHandler)

router.patch('/profile/:userId', jsonBodyParser, routes.updateDataUserHandler)

export default router
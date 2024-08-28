import express from 'express'
import routes from './handlers/index.js'

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

const router = express.Router()

router.post('/users', jsonBodyParser, routes.registerUserHandler)
router.post('/admin', jsonBodyParser, routes.registerAdminHandler)
router.post('/users/auth', jsonBodyParser, routes.authenticateAdminHandler)
router.post('/createtask', jsonBodyParser, routes.createTaskHandler)

router.delete('/task/:taskId', routes.deleteTaskHandler)
router.delete('/profile/:userId', routes.deleteProfileHandler)

router.get('/users/:targetUserId', routes.getUsernameHandler)
router.get('/getallusers', routes.getAllUsersHandler)
router.get('/getalltasks', routes.getAllTasksHandler)
router.get('/gettasks/:date', routes.getTasksForDateHandler)
router.get('/getdaywithtasks/:selectedDate', routes.getDayWithTaskHandler)

router.patch('/username', jsonBodyParser, routes.updateUsernameHandler)
router.patch('/email', jsonBodyParser, routes.updateEmailHandler)
router.patch('/avatar', jsonBodyParser, routes.updateAvatarHandler)
router.patch('/task/:taskId/done', jsonBodyParser, routes.toggleDoneTaskHandler)
router.patch('/description/:taskId', jsonBodyParser, routes.updateTaskDescriptionHandler)

export default router
import express from 'express';
import routes from './handlers/index.js';

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

const router = express.Router();

router.post('/users', jsonBodyParser, routes.registerUserHandler)
router.get('/users/:userId/manage', routes.getUserNameHandler)
router.patch('/users/:userId/manage', jsonBodyParser, routes.editUserContactHandler)
router.delete('/users/:userId/manage', jsonBodyParser, routes.closeAccountHandler)
router.post('/users/auth', jsonBodyParser, routes.authenticateUserHandler)

router.get('/rooms', routes.getAllRoomsHandler)
router.post('/rooms', jsonBodyParser, routes.createRoomHandler)
router.get('/rooms/:roomId', routes.getRoomHandler)
router.get('/users/:userId/rooms', routes.getAllUserRoomsHandler)
router.patch('/rooms/:roomId/manage',  jsonBodyParser, routes.editRoomHandler)
router.delete('/rooms/:roomId/manage', jsonBodyParser, routes.deleteRoomHandler)

router.post('/create-booking/:roomId', jsonBodyParser, routes.createBookingHandler)
router.get('/create-booking/:roomId', routes.getBlockedDatesByRoomHandler)
router.get('/bookings/:roomId', routes.getRoomBookingsHandler)
router.get('/users/:userId/bookings', routes.getAllBookingsByGuestHandler)
router.delete('/rooms/:roomId/manage/booking', jsonBodyParser, routes.deleteBookingByHostHandler)

export default router;



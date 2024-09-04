import 'dotenv/config'
import logic from '../logic/index.js'

const getRoomBookingsHandler = (req, res, next) => {
  try {
    const { roomId } = req.params

    try {
      logic.getRoomBookings(roomId)
      .then(bookings => res.json(bookings))
      .catch(error => next(error))

    } catch (error) {
      next(error)
    }
    
  } catch (error) {
    next(error)
  }
}
 
export default getRoomBookingsHandler
import getArtistsByCity from './getArtistsByCity'
import getArtistData from './getArtistData'
import isUserLoggedIn from './isUserLoggedIn'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import registerUser from './registerUser'
import updateArtistData from './updateArtistData'

const logic = {
  registerUser,
  loginUser,
  getArtistData,
  logoutUser,
  isUserLoggedIn,
  getArtistsByCity,
  updateArtistData,
}

export default logic

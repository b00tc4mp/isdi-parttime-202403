import getArtistsByCity from './getArtistsByCity'
import getArtistData from './getArtistData'
import isUserLoggedIn from './isUserLoggedIn'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import registerArtist from './registerArtist'
import updateArtistData from './updateArtistData'
import registerClient from './registerClient'
import getUserChatsAndMessages from './getUserChatsAndMessages'
import createAndUpdateMessage from './createAndUpdateMessage'
import createNewChatAndMessage from './createNewChatAndMessage'

const logic = {
  registerArtist,
  loginUser,
  getArtistData,
  logoutUser,
  isUserLoggedIn,
  getArtistsByCity,
  updateArtistData,
  registerClient,
  getUserChatsAndMessages,
  createAndUpdateMessage,
  createNewChatAndMessage,
}

export default logic

import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getArtistData from './getArtistData.js'
import getArtistsByCity from './getArtistsByCity.js'
import updateArtist from './updateArtist.js'
import registerClient from './registerClient.js'

import createChat from './createChat.js'
import createMessage from './createMessage.js'

const logic = {
  registerUser,
  authenticateUser,
  getArtistData,
  createChat,
  getArtistsByCity,
  updateArtist,
  registerClient,
  createMessage,
}

export default logic

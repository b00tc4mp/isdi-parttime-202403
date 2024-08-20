import authenticateUser from './authenticateUser.js'
import registerArtist from './registerArtist.js'
import getArtistData from './getArtistData.js'
import getArtistsByCity from './getArtistsByCity.js'
import updateArtist from './updateArtist.js'
import registerClient from './registerClient.js'
import createChat from './createChat.js'
import createMessage from './createMessage.js'
import getUserChatsAndMessages from './getUsersChatsAndMessages.js'
import updateChatWithMessage from './updateChatWithMessage.js'
import createAndUpdateMessage from './createAndUpdateMessage.js'

const logic = {
  registerArtist,
  authenticateUser,
  getArtistData,
  createChat,
  getArtistsByCity,
  updateArtist,
  registerClient,
  createMessage,
  getUserChatsAndMessages,
  updateChatWithMessage,
  createAndUpdateMessage,
}

export default logic

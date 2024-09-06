import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import createAd from './createAd.js'
import getAllAds from './getAllAds.js'
import deleteAd from './deleteAd.js'
import getUsername from './getUsername.js'
import getUserInfo from './getUserInfo.js'
import createAdComment from './createAdComment.js'
import getAd from './getAd.js'
import deleteAdComment from './deleteAdComment.js'
import searchAds from './searchAds.js'
import updateAd from './updateAd.js'




const logic = {
    registerUser,
    authenticateUser,
    createAd,
    getAllAds,
    deleteAd,
    getUsername,
    getUserInfo,
    createAdComment,
    getAd,
    deleteAdComment,
    searchAds,
    updateAd

}

export default logic
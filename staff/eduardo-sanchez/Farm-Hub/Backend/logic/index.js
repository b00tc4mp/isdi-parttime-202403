import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import createAd from './createAd.js'
import getAllAds from './getAllAds.js'
import deleteAd from './deleteAd.js'
import getUserInfo from './getUserInfo.js'
import createAdComment from './createAdComment.js'
import getAd from './getAd.js'




const logic = {
    registerUser,
    authenticateUser,
    createAd,
    getAllAds,
    deleteAd,
    getUserInfo,
    createAdComment,
    getAd,

}

export default logic
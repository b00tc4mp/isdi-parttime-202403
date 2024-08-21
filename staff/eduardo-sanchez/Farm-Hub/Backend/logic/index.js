import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import createAd from './createAd.js'
import getAllAds from './getAllAds.js'
import deleteAd from './deleteAd.js'
import getUserInfo from './getUserInfo.js'
import createAdComment from './createAdComment.js'
import getaAdId from './getAdId.js'




const logic = {
    registerUser,
    authenticateUser,
    createAd,
    getAllAds,
    deleteAd,
    getUserInfo,
    createAdComment,
    getaAdId,

}

export default logic
import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import createAd from './createAd.js'
import getAllAds from './getAllAds.js'
import deleteAd from './deleteAd.js'


const logic = {
    registerUser,
    authenticateUser,
    createAd,
    getAllAds,
    deleteAd
}

export default logic
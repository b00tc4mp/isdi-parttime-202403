import registerUser from './registerUser'
import loginUser from './loginUser'
import getAllAds from './getAllAds'
import createAd from './createAd'
import getUserInfo from './getUserInfo'
import logoutUser from './logoutUser'
import isUserLoggedIn from './isUserLoggedIn'
import deleteAd from './deleteAd'


const logic = {
    registerUser,
    loginUser,
    createAd,
    getAllAds,
    getUserInfo,
    logoutUser,
    isUserLoggedIn,
    deleteAd
}

export default logic
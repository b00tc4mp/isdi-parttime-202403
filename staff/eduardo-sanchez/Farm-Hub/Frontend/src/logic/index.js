import registerUser from './registerUser'
import loginUser from './loginUser'
import getAllAds from './getAllAds'
import createAd from './createAd'
import getUserInfo from './getUserInfo'
import logoutUser from './logoutUser'
import isUserLoggedIn from './isUserLoggedIn'
import deleteAd from './deleteAd'
import createAdComment from './createAdComment'
import getAd from './getAd'
import deleteAdComment from './deleteAdComment'
import searchAds from './searchAds'
import updateAd from './updateAd'


const logic = {
    registerUser,
    loginUser,
    createAd,
    getAllAds,
    getUserInfo,
    logoutUser,
    isUserLoggedIn,
    deleteAd,
    createAdComment,
    getAd,
    deleteAdComment,
    searchAds,
    updateAd
}

export default logic
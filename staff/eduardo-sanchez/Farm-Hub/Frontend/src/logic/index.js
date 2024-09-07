import registerUser from './registerUser'
import loginUser from './loginUser'

import logoutUser from './logoutUser'
import isUserLoggedIn from './isUserLoggedIn'

import getUsername from './getUsername'
import getUserInfo from './getUserInfo'
import getAllAds from './getAllAds'
import getAd from './getAd'
import getUserAds from './getUserAds'

import createAd from './createAd'
import deleteAd from './deleteAd'
import updateAd from './updateAd'
import searchAds from './searchAds'
import createAdComment from './createAdComment'
import deleteAdComment from './deleteAdComment'


const logic = {
    registerUser,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    getUsername,
    getUserInfo,
    getAllAds,
    getAd,
    getUserAds,
    createAd,
    deleteAd,
    updateAd,
    searchAds,
    createAdComment,
    deleteAdComment,
}

export default logic
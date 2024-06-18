import errors from '../errors'

const isUserLoggedIn = () => !!sessionStorage.token

export default isUserLoggedIn
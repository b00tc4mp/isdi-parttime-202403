import errors from '.com/errorss'

const isUserLoggedIn = () => !!sessionStorage.token

export default isUserLoggedIn
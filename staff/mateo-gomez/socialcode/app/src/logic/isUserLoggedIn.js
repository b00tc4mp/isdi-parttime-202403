const isUserLoggedIn = () => {
    return !!sessionStorage.token
}

export default isUserLoggedIn

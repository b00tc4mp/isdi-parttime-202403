const isUserLoggedIn = () => {
    return sessionStorage.getItem('token') !== null
  }

export default isUserLoggedIn
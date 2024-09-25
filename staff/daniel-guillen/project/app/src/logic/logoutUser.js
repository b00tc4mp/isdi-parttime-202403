const logoutUser = () => {
    sessionStorage.removeItem('token') // elimina el token del sessionStorage
    sessionStorage.removeItem('reference') // elimina referencia
  }

  export default logoutUser
const logoutUser = () => {
    sessionStorage.removeItem('token') // elimina el token del sessionStorage
    sessionStorage.removeItem('reference') // elimina referencia
    // sessionStorage.clear() // eliminar data almacenada en sessionStorage
  }

  export default logoutUser
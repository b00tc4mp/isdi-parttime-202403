const logoutUser = () => {
    
    sessionStorage.removeItem('token') // Elimina el token del sessionStorage
    sessionStorage.removeItem('reference') // Eliminar reference de sessionStorage
    alert('Hasta pronto!👋')  // Muestra el mensaje

}

export default logoutUser
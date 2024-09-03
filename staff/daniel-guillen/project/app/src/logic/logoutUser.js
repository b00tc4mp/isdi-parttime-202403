const logoutUser = () => {
    
    sessionStorage.removeItem('token') // Elimina el token del sessionStorage
    alert('Hasta pronto! 👋')  // Muestra el mensaje

}

export default logoutUser
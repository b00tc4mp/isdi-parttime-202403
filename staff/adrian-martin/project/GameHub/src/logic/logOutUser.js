const logOutUser = () => {
    sessionStorage.removeItem('token')
}

export default logOutUser
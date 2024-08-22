const logoutUser = () => {
  delete sessionStorage.token
  delete sessionStorage.role
}

export default logoutUser

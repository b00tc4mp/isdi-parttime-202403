const logoutUser = () => {
  sessionStorage.removeItem('token')
}
export default logoutUser
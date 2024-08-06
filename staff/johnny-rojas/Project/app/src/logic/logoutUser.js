const logoutUser = () => {
  sessionStorage.removeItem('token'); 
  sessionStorage.removeItem('email');
}
export default logoutUser
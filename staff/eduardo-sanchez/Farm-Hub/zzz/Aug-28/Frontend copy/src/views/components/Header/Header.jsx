import { useNavigate } from "react-router-dom";

import logic from "../../../logic";

import Title from "../../../components/core/Title";
import "./Header.css";

import InfoIcon from "../../../icons/info.png";
import LogoutIcon from "../../../icons/logout.png";
// import Link from '../../../components/core/Link'

function Header({ user }) {
  console.log("Header -> render");

  const navigate = useNavigate();

  // const user = ''

  const handleLogout = () => {
    logic.logoutUser();
    navigate("/login");
  };

  return (
    <header className="Header">
      <h1 className="UsernameTitle">
        {user.username ? user.username : "notloggedin"}
      </h1>
      <Title>Farm-Hub</Title>
      <div className="LogoutButtonContainer">
        {/* <button className='LogoutButton' onClick={handleLogout}>Logout</button> */}

        <img src={InfoIcon} width={24} alt="Info" />
        <img src={LogoutIcon} width={24} alt="Logout" onClick={handleLogout} />
      </div>
    </header>
  );
}

export default Header;

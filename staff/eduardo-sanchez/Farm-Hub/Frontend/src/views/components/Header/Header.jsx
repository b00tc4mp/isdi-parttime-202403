import { Link, useNavigate } from "react-router-dom";

import logic from "../../../logic";

import "./Header.css";
import Title from "../../../components/core/Title";
import Button from "../../../components/core/Button";

import LogoutIcon from "../../../icons/logout.png";
import SearchIcon from "../../../icons/search.png";
import InfoIcon from "../../../icons/info.png";
// import Link from '../../../components/core/Link'

function Header({ user, setSearch }) {
  console.log("Header -> render");

  const navigate = useNavigate();

  // const user = ''

  const handleLogout = () => {
    logic.logoutUser();
    navigate("/login");
  };

  const handleSearch = () => setSearch(true);

  return (
    <header className="Header">
      <h1 className="UsernameTitle">
        {user.username ? user.username : "notloggedin"}
      </h1>
      <Title>Farm-Hub</Title>
      <div className="LogoutButtonContainer">
        {/* <button className='LogoutButton' onClick={handleLogout}>Logout</button> */}

        <img src={InfoIcon} width={24} alt="Info" />
        <img src={SearchIcon} width={24} alt="Search" onClick={handleSearch} />
        <img src={LogoutIcon} width={24} alt="Logout" onClick={handleLogout} />
      </div>
    </header>
  );
}

export default Header;

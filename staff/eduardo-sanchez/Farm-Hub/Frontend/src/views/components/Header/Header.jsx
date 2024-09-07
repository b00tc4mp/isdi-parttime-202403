import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logic from "../../../logic";

import Title from "../../../components/core/Title";
import "./Header.css";

import InfoIcon from "../../../icons/info.png";
import LogoutIcon from "../../../icons/logout.png";

import UserInfoMenu from "../UserInfoMenu";
import SearchBox from "../SearchBox/SearchBox";
// import Link from '../../../components/core/Link'

function Header({ user }) {
  console.log("Header -> render");
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const navigate = useNavigate();

  // const user = ''

  const handleUserInfoMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  }

  const handleLogout = () => {
    logic.logoutUser();
    navigate("/login");
  };

  // const handleSearch = () => {

  // }


  // const currentSearchText = () => {

  // }


  return (
    <>

      <header >
        <div className="Header">
          <h1 className="UsernameTitle">
            {user.username ? user.username : "notloggedin"}
          </h1>
          <Title>Farm-Hub</Title>
          <div className="LogoutButtonContainer">
            {/* <button className='LogoutButton' onClick={handleLogout}>Logout</button> */}

            <img src={InfoIcon} width={24} alt="User Information" onClick={handleUserInfoMenu} />
            <img src={LogoutIcon} width={24} alt="Logout Button" onClick={handleLogout} />
          </div>
          {isMenuOpened && <UserInfoMenu />}
        </div>
        {/* <div >
          <SearchBox onSearch={handleSearch} initialSearchText={currentSearchText}
          />
        </div> */}

      </header>

    </>
  );
}

export default Header;

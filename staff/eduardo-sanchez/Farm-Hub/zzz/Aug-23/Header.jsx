import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Import useState

import logic from '../../../logic';

import './Header.css';
import Title from '../../../components/core/Title';
import Button from '../../../components/core/Button';

import LogoutIcon from '../../../icons/logout.png';
import SearchIcon from '../../../icons/search.png';
import InfoIcon from '../../../icons/info.png';

import SearchBox from '../SearchBox/SearchBox'; // Import SearchBox

function Header({ user }) {
    console.log('Header -> render');
    const [searchVisible, setSearchVisible] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        logic.logoutUser();
        navigate('/login');
    };

    const handleSearch = () => setSearchVisible(true);

    return (
        <header className="Header">
            <h1 className='UsernameTitle'>{user.username ? user.username : 'not logged in'}</h1>
            <Title>Farm-Hub</Title>
            <div className='LogoutButtonContainer'>
                <img src={InfoIcon} width={24} alt="Info" />
                <img src={SearchIcon} width={24} alt="Search" onClick={handleSearch} />
                <img src={LogoutIcon} width={24} alt="Logout" onClick={handleLogout} />
            </div>

            {searchVisible && <SearchBox onSearch={handleSearch} />}
        </header>
    );
}

export default Header;

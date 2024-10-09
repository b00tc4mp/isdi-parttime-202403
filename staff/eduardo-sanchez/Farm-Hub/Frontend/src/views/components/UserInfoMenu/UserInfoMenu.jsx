import { useNavigate } from 'react-router-dom';

import './UserInfoMenu.css';

const UserInfoMenu = () => {
    const navigate = useNavigate();

    const handleMyAccountClick = () => {
        navigate(`/myaccount`);
    };

    const handleMyAdsClick = () => {
        navigate(`/myads`);
    };

    const handleMyCommentsClick = () => {
        navigate(`/mycomments`);
    };

    return (
        <div className="UserInfoMenuContainer">
            <ul className="UserInfoMenuList">
                <li onClick={handleMyAccountClick}>My Account</li>
                <li onClick={handleMyAdsClick}>My Ads</li>
                <li onClick={handleMyCommentsClick}>My Comments</li>
            </ul>
        </div>
    );
};

export default UserInfoMenu;

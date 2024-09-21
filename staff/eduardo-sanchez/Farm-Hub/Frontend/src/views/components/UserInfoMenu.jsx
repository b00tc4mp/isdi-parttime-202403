// import { useEffect } from 'react';
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
        // <div className="absolute bg-gray-500 right-3 top-12 rounded-xl p-1 z-10">
        //     <ul>
        //         <li onClick={handleMyAccountClick}>My Account</li>
        //         <li onClick={handleMyAdsClick}>My Ads</li>
        //         <li onClick={handleMyCommentsClick}>My Comments</li>
        //     </ul>
        // </div>
    );
};

export default UserInfoMenu;

// import { Link } from "react-router-dom"
// /*
// Mis datos -> /my-account
// Mis anuncios -> /my-ads
// Mis comentarios -> /my-comments
// (Mis favoritos) -> /my-favorites
// */
// export const UserInfoMenu = () => {
//     return (
//         <ul>
//             <li><Link to="/my-account/">Your account </Link></li>
//             <li><Link to="/my-ads/">My ads </Link></li>
//             <li><Link to="/my-comments/">My comments</Link></li>
//             {/* <li>Your favorites</li> */}
//         </ul>
//     )
// }

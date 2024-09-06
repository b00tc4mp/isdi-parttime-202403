import { useNavigate } from 'react-router-dom';

const UserInfoMenu = (userId) => {
    const navigate = useNavigate();

    const handleMyAccountClick = () => {
        navigate(`/myaccount/${userId}`); // este userId tiene q estar disponible 
    };

    return (
        <div className="dropdown-menu">
            <ul>
                <li onClick={handleMyAccountClick}>My Account</li>
                <li>Your Ads</li>
                <li>Your Comments</li>
            </ul>
        </div>
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
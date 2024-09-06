import { Link } from "react-router-dom"
/*
Mis datos -> /my-account
Mis anuncios -> /my-ads
Mis comentarios -> /my-comments
(Mis favoritos) -> /my-favorites
*/
export const UserInfoMenu = () => {
    return (
        <ul>
            <li><Link to="/my-account/">Your account </Link></li>
            <li><Link to="/my-ads/">My ads </Link></li>
            <li><Link to="/my-comments/">My comments</Link></li>
            {/* <li>Your favorites</li> */}
        </ul>
    )
}
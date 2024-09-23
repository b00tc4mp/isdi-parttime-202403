// import { useEffect, useState } from 'react';

// import { useNavigate, useParams, useLocation } from 'react-router-dom';

// import { SystemError } from 'com/errors';

// import Title from '../components/core/Title';

// import logic from '../logic';

// import backArrow from '../icons/backArrow.png';

// import './MyAccount.css';

// export const MyAccount = () => {
//     const [userInfo, setUserInfo] = useState(null);

//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('MyAccount -> useEffect');
//         loadUserInfo();
//     }, []);

//     const loadUserInfo = () => {
//         try {
//             logic
//                 .getUserInfo()
//                 .then((userInfo) => {
//                     setUserInfo(userInfo);
//                     console.log(userInfo);
//                 })
//                 .catch((error) => {
//                     if (error instanceof SystemError) {
//                         console.log(error.message);
//                         alert(error.message);
//                     }
//                 });
//         } catch (error) {
//             console.error(error.message);
//             alert(error.message);
//         }
//     };

//     // const handleLoadUserInfo = () => loadUserInfo();

//     return (
//         <>
//             <Title className="text-center text-2xl text-black mt-3 mb-3 p-1 underline">
//                 My Account
//             </Title>

//             <img
//                 className="absolute left-3 top-3 w-11 bg-transparent  cursor-pointer text-black font-bold"
//                 src={backArrow}
//                 alt="Go back"
//                 onClick={() => navigate(-1)}
//             />

//             {userInfo && (
//                 <div className="MyAccountContainer">
//                     {/* <p>{userInfo._id}</p> */}
//                     <p className="MyAccountName">Name: {userInfo.name}</p>
//                     <p className="MyAccountSurname">
//                         Surname: {userInfo.surname}
//                     </p>
//                     <p className="MyAccountEmail">Email: {userInfo.email}</p>
//                     <p className="MyAccountUsername">
//                         Username: {userInfo.username}
//                     </p>

//                     {/* <button onClick={handleLoadUserInfo} /> */}
//                 </div>
//             )}
//         </>
//     );
// };

// puedes crear update password

// const handlePasswordUpdate = (newPassword) => {
//    // Add logic to update the password here

//     logic.updatePassword(userId, newPassword)
//         .then(() => alert('Password updated successfully'))
//         .catch(error => alert(error.message));
// };

/* Add password update form */

/* <form onSubmit={(e) => {
    e.preventDefault();
    const newPassword = e.target.elements.password.value;
    handlePasswordUpdate(newPassword);
}}>
    <h3>Update Password</h3>
    <input type="password" name="password" placeholder="New Password" required />
    <button type="submit">Update Password</button>
</form> */

//////////////////////////

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SystemError } from 'com/errors';
// import Title from '../components/core/Title';
// import logic from '../logic';
// import backArrow from '../icons/backArrow.png';
// import './MyAccount.css';

// export const MyAccount = () => {
//     const [userInfo, setUserInfo] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log('MyAccount -> useEffect');
//         loadUserInfo();
//     }, []);

//     const loadUserInfo = () => {
//         try {
//             logic
//                 .getUserInfo()
//                 .then(setUserInfo)
//                 .catch((error) => {
//                     if (error instanceof SystemError) {
//                         console.log(error.message);
//                         alert(error.message);
//                     }
//                 });
//         } catch (error) {
//             console.error(error.message);
//             alert(error.message);
//         }
//     };

//     return (
//         <div className="p-6">
//             <Title className="text-center text-3xl text-green-700 font-bold mb-6">
//                 My Account
//             </Title>

//             <img
//                 className="absolute left-4 top-4 w-10 cursor-pointer hover:opacity-75 transition-opacity"
//                 src={backArrow}
//                 alt="Go back"
//                 onClick={() => navigate(-1)}
//             />

//             {userInfo && (
//                 <div className="MyAccountContainer">
//                     <div>
//                         <span className="MyAccountfields">Name:</span>
//                         <span className="NameValue">{userInfo.name}</span>
//                     </div>
//                     <div>
//                         <span className="MyAccountfields">Surname</span>
//                         <span className="SurnameValue">{userInfo.surname}</span>
//                     </div>
//                     <div>
//                         <span className="MyAccountfields">Email</span>
//                         <span className="EmailValue">{userInfo.email}</span>
//                     </div>
//                     <div>
//                         <span className="MyAccountfields">Username</span>
//                         <span className="UsernametValue">
//                             {userInfo.username}
//                         </span>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

//////////////////////////////////

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SystemError } from 'com/errors';
import Title from '../components/core/Title/Title';
import logic from '../logic';
import backArrow from '../icons/backArrow.png';
import './MyAccount.css';

export const MyAccount = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('MyAccount -> useEffect');
        loadUserInfo();
    }, []);

    const loadUserInfo = () => {
        try {
            logic
                .getUserInfo()
                .then(setUserInfo)
                .catch((error) => {
                    if (error instanceof SystemError) {
                        console.log(error.message);
                        alert(error.message);
                    }
                });
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    return (
        <>
            <Title className="text-center text-2xl text-black mt-3 mb-1 p-1 underline">
                My Account
            </Title>

            <img
                className="absolute left-3 top-3 w-11 bg-transparent cursor-pointer text-black font-bold"
                src={backArrow}
                alt="Go back"
                onClick={() => navigate(-1)}
            />

            {userInfo && (
                <div className="MyAccountContainer">
                    <div className="MyAccountField">
                        <span className="MyAccountLabel">Name</span>
                        <span className="MyAccountValue">{userInfo.name}</span>
                    </div>
                    <div className="MyAccountField">
                        <span className="MyAccountLabel">Surname</span>
                        <span className="MyAccountValue">
                            {userInfo.surname}
                        </span>
                    </div>
                    <div className="MyAccountField">
                        <span className="MyAccountLabel">Email</span>
                        <span className="MyAccountValue">{userInfo.email}</span>
                    </div>
                    <div className="MyAccountField">
                        <span className="MyAccountLabel">Username</span>
                        <span className="MyAccountValue">
                            {userInfo.username}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

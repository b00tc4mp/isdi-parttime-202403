import { useEffect, useState } from 'react';

import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Title from '../components/core/Title';

import logic from '../logic';

export const MyAccount = () => {

    //const navigate = useNavigate();
    //const { userId } = useParams();

    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        console.log("MyAccount -> useEffect");
        loadUserInfo();
    }, []);
    // userId


    const loadUserInfo = () => {
        try {
            logic
                .getUserInfo()
                .then((userInfo) => {
                    setUserInfo(userInfo);
                    console.log(userInfo);
                });
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    const handleLoadUserInfo = () => loadUserInfo();

    return (
        <div>
            <Title>My Account</Title>

            {userInfo && (
                <>

                    <p>{userInfo._id}</p>
                    <p>Name: {userInfo.name}</p>
                    <p>Surname: {userInfo.surname}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Username: {userInfo.username}</p>

                    <button
                        // userInfo={userInfo}
                        onClick={handleLoadUserInfo}
                    />
                </>
            )}
        </div>
    )



}

// puedes crear update password

// const handlePasswordUpdate = (newPassword) => {
//    // Add logic to update the password here

//     logic.updatePassword(userId, newPassword)
//         .then(() => alert('Password updated successfully'))
//         .catch(error => alert(error.message));
// };



{/* Add password update form */ }
{/* <form onSubmit={(e) => {
    e.preventDefault();
    const newPassword = e.target.elements.password.value;
    handlePasswordUpdate(newPassword);
}}>
    <h3>Update Password</h3>
    <input type="password" name="password" placeholder="New Password" required />
    <button type="submit">Update Password</button>
</form> */}
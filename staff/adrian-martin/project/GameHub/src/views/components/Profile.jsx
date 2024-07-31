import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logic from '../../logic';
import View from '../../components/library/View/View';
import Header from './Header/Header';
import Button from '../../components/core/Button/Button';
import Footer from './Footer/Footer';
import Text from '../../components/core/Text/Text';

import Burguer from './Burguer/Burguer';

import './Profile.css'

function Profile() {
    console.log('Profile -> render')
    const navigate = useNavigate()
    const [username, setUsername] = useState('')

    const handleLogOut = () => {
        logic.logOutUser();

        navigate('/login')
    };

    logic.getUserName()
        .then(username => {
            setUsername(username)
        })
        .catch(error => {
            console.error(error)
            alert(error.message)
        })

    return <View>
        <Header>
            <Burguer>
                <Link to='/' >Game List</Link>
                <Link to='/profile' >Profile</Link>
                <Link to='/socialist' >Social List</Link>
                <Button onClick={handleLogOut} >Log Out</Button>
            </Burguer>
        </Header>

        <div className='Profile'>
            <div className='Image'></div>
            <Text className='Username'>{username}</Text>
            <div className='Separator'></div>
            <Text className='Game-List'>Game List</Text>
        </div>


        <Footer />
    </View>
}

export default Profile
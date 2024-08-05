import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faHouseChimney, faUser, faUsers, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logic from '../../logic';
import View from '../../components/library/View/View';
import Header from './Header/Header';
import Button from '../../components/core/Button/Button';
import Footer from './Footer/Footer';
import Text from '../../components/core/Text/Text';

import Burguer from './Burguer/Burguer';
import PanelEditUsername from './panelEditUsername/PanelEditUsername';

import './Profile.css'

function Profile({ }) {
    console.log('Profile -> render')

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [isEditingUsername, setIsEditingUsername] = useState(false)

    const [stamp, setStamp] = useState(Date.now())


    useEffect(() => {
        logic.getUserName()
            .then(username => {
                setUsername(username)
            })
            .catch(error => {
                console.error(error)
                alert(error.message)
            })
    }, [stamp])

    const handleLogOut = () => {
        logic.logOutUser();
        navigate('/login')
    };

    const startEditingUsername = () => {
        setIsEditingUsername(true)
    }

    const handleClosePanel = () => {
        setIsEditingUsername(false);
    };

    return <View>
        <Header>
            <Burguer>
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faHouseChimney} /></div>
                    <Link to='/' >Game List</Link>
                </div>
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faUser} /></div>
                    <Link to='/profile' >Profile</Link>
                </div>
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faUsers} /></div>
                    <Link to='/socialist' >Social List</Link>
                </div>
                <div className='Link-menu-burguer'>
                    <div className='Icon'><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
                    <Button onClick={handleLogOut} >Log Out</Button>
                </div>
            </Burguer>
        </Header>

        <div className='Profile'>
            <div className='Image'></div>
            <div className='Username-edit'>
                <Text className='Username'>{username}</Text>
                <div className='Icon-edit'>
                    <FontAwesomeIcon
                        icon={faPen}
                        size='xl'
                        style={{ color: "#235186", }}
                        onClick={startEditingUsername}
                    />
                </div>
            </div>

            {isEditingUsername && (
                <PanelEditUsername
                    // setStamp={setStamp}
                    // username={username}
                    // setUsername={setUsername}
                    // onClose={handleClosePanel}

                    setStamp={setStamp}
                    onClose={handleClosePanel}
                />
            )}

            <div className='Separator'></div>
            <Text className='Game-List'>Game List</Text>
        </div>

        <Footer />

    </View>
}

export default Profile
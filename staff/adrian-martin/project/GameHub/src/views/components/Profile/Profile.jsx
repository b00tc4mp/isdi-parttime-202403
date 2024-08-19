import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logic from '../../../logic/index';
import Header from '../Header/Header';
import Button from '../../../components/core/Button/Button';
import Footer from '../Footer/Footer';
import Text from '../../../components/core/Text/Text';

import PanelEditUsername from './panelEditUsername/PanelEditUsername';
import ProfileImage from '../ProfileImage/ProfileImage';

import './Profile.css'

function Profile() {
    console.log('Profile -> render')

    const navigate = useNavigate()
    const [username, setUsername] = useState(null)
    const [isEditingUsername, setIsEditingUsername] = useState(false)
    const [refresh, setRefresh] = useState(Date.now());

    useEffect(() => {
        logic.getUserName()
            .then(username => {
                setUsername(username)
            })
            .catch(error => {
                console.error(error)
                alert(error.message)
            })
    }, [refresh])

    const handleRefresh = () => {
        setRefresh(Date.now())
    }

    const handleGoHome = () => {
        navigate('/')
    }

    const startEditingUsername = () => {
        setIsEditingUsername(true)
    }

    const handleClosePanel = () => {
        setIsEditingUsername(false);
    };

    return <div>
        <Header />

        <div className='Profile'>
            <div >
                <ProfileImage />
            </div>
            <div className='Username-edit'>
                <Text className='Username'>{username}</Text>
                <div className='Icon-edit'>
                    <FontAwesomeIcon
                        icon={faPen}
                        size='xl'
                        style={{ color: '#235186', }}
                        onClick={startEditingUsername}
                    />
                </div>
            </div>

            {isEditingUsername && (
                <PanelEditUsername
                    onClose={handleClosePanel}
                    onUsernameUpdated={handleRefresh}
                />
            )}

            <div className='Separator'></div>
            <Button onClick={handleGoHome} className='Game-List'>Game List</Button>
        </div>

        <Footer />

    </div>
}

export default Profile
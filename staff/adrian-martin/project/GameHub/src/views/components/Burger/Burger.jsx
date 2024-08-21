import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import { faHouseChimney, faUser, faUsers, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './Burger.css'

import Button from '../../../components/core/Button/Button'
import logic from '../../../logic'

function Burger({ children }) {
    const [burgerClass, setBurgerClass] = useState('burger-bar unclicked')
    const [menuClass, setMenuClass] = useState('menu hidden')
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        setBurgerClass(isMenuClicked ? 'burger-bar unclicked' : 'burger-bar clicked')
        setMenuClass(isMenuClicked ? 'menu hidden' : 'menu visible')
        setIsMenuClicked(!isMenuClicked)
    }

    const navigate = useNavigate()


    const handleLogOut = () => {
        logic.logOutUser()
        navigate('/login')
    }

    const menuItems = [
        { icon: faHouseChimney, label: 'Game List', to: '/' },
        { icon: faUser, label: 'Profile', to: '/profile' },
        { icon: faUsers, label: 'Social List', to: '/sociallist' },
        { icon: faArrowRightFromBracket, label: 'Log Out', onClick: handleLogOut, isButton: true }
    ]

    return (
        <div>
            <div>
                <div className='burger-menu' onClick={updateMenu}>
                    <div className={burgerClass}></div>
                    <div className={burgerClass}></div>
                    <div className={burgerClass}></div>
                </div>
            </div>

            <div className={menuClass}>
                <div>
                    {menuItems.map((item, index) => (
                        <div key={index} className='Link-menu-burguer'>
                            <div className='Icon'>
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
                            {item.isButton ? (
                                <Button onClick={item.onClick}>{item.label}</Button>
                            ) : (
                                <Link to={item.to}>{item.label}</Link>
                            )}
                        </div>
                    ))}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Burger
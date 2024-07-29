import React, { useState } from 'react';
import './Burguer.css'

const Burguer = () => {

    // cambiar clases del burguer
    const [burguer_class, setBurguerClass] = useState('burger-bar unclicked')
    const [menu_class, setMenuClass] = useState('menu hidden')
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    // menu del burguer
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurguerClass('burger-bar clicked')
            setMenuClass('menu visible')
        }
        else {
            setBurguerClass('burger-bar unclicked')
            setMenuClass('menu hidden')
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <nav>
                <div className='burger-menu' onClick={updateMenu}>
                    <div className={burguer_class} ></div>
                    <div className={burguer_class} ></div>
                    <div className={burguer_class} ></div>
                </div>
            </nav>

            <div className={menu_class}>
                <div>
                    <div>Game List</div>
                    <div>Profile</div>
                    <div>Social List</div>
                    <div>Log Out</div>
                </div>
            </div>
        </div>
    )
}

export default Burguer
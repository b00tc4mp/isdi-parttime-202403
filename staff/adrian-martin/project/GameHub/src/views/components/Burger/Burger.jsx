import React, { useState } from 'react';
import './Burger.css'

function Burguer({ children }) {

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
        <div>
            <div>
                <div className='burger-menu' onClick={updateMenu}>
                    <div className={burguer_class} ></div>
                    <div className={burguer_class} ></div>
                    <div className={burguer_class} ></div>
                </div>
            </div>

            <div className={menu_class}>
                <div>
                    {React.Children.map(children, (child) => (
                        <div>{child}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Burguer
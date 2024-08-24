import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'

import './ProfileImage.css'

function ProfileImage({ onClick, size = '250px', showRotate = true, borderRadius = '10px' }) {
    const [currentImage, setCurrentImage] = useState(0)

    const images = [
        '/images/Icono1_Blanco.png',
        '/images/Icono2_Verde.png',
        '/images/Icono3_Rojo.png',
        '/images/Icono4_Azul.png',
        '/images/Icono5_Amarillo.png',
        '/images/Icono6_Pink.png',
    ];

    const handleChangeImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    };

    return (
        <div className='Profile-ImageIcon' style={{ width: size, height: size }}>
            <img
                onClick={onClick}
                src={images[currentImage]}
                alt='Profile'
                className='Profile-image'
                style={{ width: size, height: size, borderRadius: borderRadius }}
            />

            {/* {showRotate && (
                <FontAwesomeIcon
                    className='Rotate'
                    icon={faRotate}
                    onClick={handleChangeImage}
                    style={{ fontSize: `calc(${size} / 8)` }}
                />
            )} */}

        </div>
    )
}

export default ProfileImage
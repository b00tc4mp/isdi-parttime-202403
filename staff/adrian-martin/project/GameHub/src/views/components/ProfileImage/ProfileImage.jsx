import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'

import './ProfileImage.css'

function ProfileImage() {
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
        <div className='Profile-ImageIcon'>

            <img
                src={images[currentImage]}
                alt='Profile' className='Profile-image' />

            <FontAwesomeIcon
                className='Rotate'
                icon={faRotate}
                onClick={handleChangeImage}
            />

        </div>
    )
}

export default ProfileImage
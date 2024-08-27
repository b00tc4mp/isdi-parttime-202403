import { useNavigate } from "react-router-dom"

import './CreateAdButton.css'

// import '../../../components/core/Button/index.css'

export const CreateAdButton = ({ }) => {
    const navigate = useNavigate()

    return (

        <footer className="CreateAdButtonFooter">

            <button className="CreateAdButton" onClick={() => navigate('/createAd')}>+</button>
        </footer>

    )

}


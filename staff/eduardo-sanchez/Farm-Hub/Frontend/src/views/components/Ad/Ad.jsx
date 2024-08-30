import { useNavigate, Link } from 'react-router-dom'

import Button from '../../../components/core/Button'

import logic from '../../../logic'

import './Ad.css'

export const Ad = ({ ad, onAdDeleted }) => {
    console.log('Ad -> render')

    const navigate = useNavigate()

    const handleDeleteAd = (event) => {
        event.stopPropagation()
        if (confirm('Are you sure you want to delete this ad?')) {

            try {
                logic.deleteAd(ad._id)
                    .then(() => {
                        console.log(`Ad ${ad._id} deleted`)
                        onAdDeleted()

                    })
                    .catch(error => {
                        console.error('Could not delete ad:', error)

                        alert(error.message)
                    })
            } catch (error) {
                console.error('Failed to delete ad:', error)

                alert(error.message)
            }

        }
    }

    const handleUpdateAd = (event) => {
        event.stopPropagation()
        navigate(`/updateadform/${ad._id}`)
    }

    return (

        <div className="AdActions">

            <Button

                className="DeleteButton" type="button" onClick={handleDeleteAd}>Delete

            </Button>


            <button

                className="DeleteButton" type="button" onClick={handleUpdateAd}>Update

            </button>

        </div>

    )
}

import Button from '../../../components/core/Button'

import logic from '../../../logic'

import './Ad.css'

export const Ad = ({ ad, onAdDeleted }) => {
    console.log('Ad -> render')

    const handleDeleteAd = () => {
        if (confirm('Are you sure you want to delete this ad?'))

            try {
                logic.deleteAd(ad.id)
                    .then(() => {
                        onAdDeleted(ad.id)
                        console.log(`Ad ${ad.id} deleted`)

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

    return (

        <div>

            <Button

                className="DeleteButton" type="button" onClick={handleDeleteAd}>Delete

            </Button>

        </div>

    )
}
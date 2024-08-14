import Button from '../../../components/core/Button'

import logic from '../../../logic'

import './Ad.css'

export const Ad = ({ ad, onAdDeleted, setStamp }) => {
    console.log('Ad -> render')

    const handleDeleteAd = () => {

        try {
            logic.deleteAd(ad.id)
                .then(() => {
                    onAdDeleted()
                    setStamp(Date.now())
                })
                .catch(error => {
                    console.log(error)

                    alert(error.message)
                })
        } catch (error) {
            console.log(error)

            alert(error.message)
        }

    }

    return (

        <div>

            <Button className="DeleteButton" type="button" onClick={handleDeleteAd}>Delete</Button>

        </div>

    )
}
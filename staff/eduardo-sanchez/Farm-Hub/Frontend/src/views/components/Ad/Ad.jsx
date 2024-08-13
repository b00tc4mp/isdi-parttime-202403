import Button from '../../../components/core/Button'

import logic from '../../../logic'

export const Ad = ({ ad, onAdDeleted }) => {
    console.log('Ad -> render')

    const handleDeleteAd = () => {

        try {
            logic.deleteAd(ad.id)
                .then(() => onAdDeleted())
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
        <>
            <div>

                <Button type="button" onClick={handleDeleteAd}>Delete</Button>

            </div>
        </>
    )
}
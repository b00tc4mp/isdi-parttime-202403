import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logic from '../../../logic';
import Button from '../../../components/core/Button';
import './DeleteAdComment.css';

function DeleteAdComment({ adId, onCommentDeleted, commentId }) {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleDeleteAdComment = (event) => {
        event.stopPropagation();
        if (confirm('Are you sure you want to delete this comment?')) {
            try {
                logic.deleteAdComment(adId, commentId)
                    .then(() => {
                        console.log('Comment deleted');
                        onCommentDeleted(); // Call the callback to notify parent component  
                    })
                    .catch((error) => {
                        console.error(error);
                        setMessage(error.message); // Set error message for display  
                    });
            } catch (error) {
                console.error(error);
                setMessage(error.message); // Set error message for display  
            }
        }
    };

    return (
        <>
            <Button className="DeleteAdCommentButton" onClick={handleDeleteAdComment} type="button">
                Delete
            </Button>
            {message && <p className="ErrorMessage">{message}</p>}
        </>
    );
}

export default DeleteAdComment;

///////////////////


// import { useState } from 'react';

// import { useNavigate, Link } from 'react-router-dom'

// import logic from '../../../logic';

// import Button from '../../../components/core/Button'

// import './DeleteAdComment.css'

// function DeleteAdComment({ adId, onAdCommentSubmitted, commentId }) {
//     const [message, setMessage] = useState('')

//     const navigate = useNavigate()

//     const handleDeleteAdComment = () => {

//         try {

//             logic.deleteAdComment(adId, commentId)
//                 .then(() => {
//                     console.log('Comment deleted')
//                     onAdCommentSubmitted()

//                 })
//                 .catch((error) => {
//                     console.error(error)
//                     setMessage(error.message)
//                 })

//         } catch (error) {
//             setMessage(error.message)
//             console.error(error)
//         }
//     }



//     return (
//         <>
//             <Button className="DeleteAdCommentButton" onClick={handleDeleteAdComment} type="button">Delete</Button>

//             {message && <p className="ErrorMessage">{message}</p>}
//         </>
//     )

// }


// export default DeleteAdComment
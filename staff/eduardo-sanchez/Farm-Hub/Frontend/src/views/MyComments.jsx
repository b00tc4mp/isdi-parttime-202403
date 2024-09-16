// /*
// ---
// Anuncio "Tomates" | Ir al anuncio ->

// Tu comentario: No me gustan nada, son un asco
// ---
// Anuncio "Aceitunas" | Ir al anuncio ->

// Tu comentario: Ricas ricas

// ---

// En endpoint de back consultar anuncios que contienen un comentario cuyo autor es el usuario logeado

// Respuesta tipo:

// anuncio->comentario->if author == userid->allusercomments[]

// [
//   {
//     adData: { id: 1, name: "Tomates" },
//     comment: "No me gustan nada, son un asco"
//   },
//   {
//     adData: { id: 2, name: "Aceitunas" },
//     comment: "Ricas ricas"
//   },
// ]
// */

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Title from "../components/core/Title"

import { SystemError } from "com/errors"
import logic from "../logic"

import './MyComments.css'

export const MyComments = () => {

  const [userComments, setUserComments] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    console.log("MyComments -> useEffect");
    loadUserComments();
  }, []);

  const loadUserComments = () => {
    try {
      logic.getUserComments()
        .then((comments) => {
          setUserComments(comments)
          console.log(comments)
        })
        .catch((error) => {
          if (error instanceof SystemError) {
            console.log(error.message)
            alert(error.message)
          }
        })
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }

  // const handleLoadUserComments = () => {
  //   loadUserComments();
  // }

  const handleGoToAd = (adId) => {
    navigate(`/adpage/${adId}`)
  }


  return (

    <>

      <Title>My Comments</Title>

      {!userComments || userComments.length === 0 && (
        <p className="UserCommentsListEmpty">There are no comments found</p>)}
  
      <ul>

        {userComments.map((comment) => (

          <li key={comment._id}>
            <h3>Anuncio "{comment.title}" 
              <button
                       
                onClick={() => handleGoToAd(comment._id)}
              >
                Go to Ad
              </button>
              
            </h3>
            
            <div>Your Comment: {comment.adcomments && comment.adcomments.length > 0 && (comment.adcomments.map((_comment) => <p key={_comment._id}> {_comment.comment}

            </p> ))}
            </div>


            
            
          </li>
        )
        )}

      </ul>

      </>
  )
}

// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import Title from "../components/core/Title"
// import { SystemError } from "com/errors"
// import logic from "../logic"
// import './MyComments.css'

// export const MyComments = () => {
//   const [userComments, setUserComments] = useState([])
//   const navigate = useNavigate()

//   useEffect(() => {
//     console.log("MyComments -> useEffect");
//     loadUserComments();
//   }, []);

//   const loadUserComments = () => {
//     try {
//       logic.getUserComments()
//         .then((userComments) => {
//           setUserComments(userComments)
//           console.log(userComments)
//         })
//         .catch((error) => {
//           if (error instanceof SystemError) {
//             console.log(error.message)
//             alert(error.message)
//           }
//         })
//     } catch (error) {
//       console.error(error.message);
//       alert(error.message);
//     }
//   }

//   const handleGoToAd = (adId) => {
//     navigate(`/adpage/${adId}`)
//   }

//   return (
//     <>
//       <Title>My Comments</Title>

//       {(!userComments || userComments.length === 0) && (
//         <p className="UserCommentsListEmpty">There are no comments found</p>
//       )}
  
//       <ul>
//         {userComments.map((userComment) => (
//           <li key={userComment.adData.id}>
//             <h3>Anuncio "{userComment.adData.name}" | 
//               <button onClick={() => handleGoToAd(userComment.adData.id)}>
//                 Ir al anuncio -&gt;
//               </button>
//             </h3>
//             <p>Tu comentario: {userComment.comment}</p>
//           </li>
//         ))}
//       </ul>
//     </>
//   )
// }
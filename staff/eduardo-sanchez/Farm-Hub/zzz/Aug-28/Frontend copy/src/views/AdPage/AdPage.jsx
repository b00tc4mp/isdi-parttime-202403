import { useEffect, useState } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";
import logic from "../../logic";
import Title from "../../components/core/Title";
// import Button from '../../components/core/Button';
// import Link from '../components/core/Link';
import CreateComment from "../components/CreateCommnet/CreateComment";
import DeleteAdComment from "../components/DeleteAdComment/DeleteAdComment";

import "./AdPage.css";

function AdPage() {
  // const navigate = useNavigate()

  const [ad, setAd] = useState(null);

  const { adId } = useParams();

  useEffect(() => {
    loadAd();
  }, []);

  const loadAd = () => {
    logic
      .getAd(adId)
      .then((ad) => {
        setAd(ad);
        console.log(ad);
      })

      .catch((error) => console.error(error.message));
  };
  if (ad === null) {
    // return <h1>Loading...</h1>
    return <h1 className="AdPageLoading">Loading...</h1>;
  }

  const handleAdCommentSubmit = () => loadAd();

  // return (
  //     <div className='AdPageContainer'>

  //         <Title>{ad?.title}</Title>
  //         <p>{ad?.author.username}</p>
  //         <p>{ad?.description}</p>
  //         <p>{ad?.price}</p>
  //         <p>{ad?.date}</p>

  //         <CreateComment adId={adId} onAdCommentSubmitted={handleAdCommentSubmit} />
  //         {ad.adcomments.map(comment => {

  //             return <div key={comment._id}>
  //                 <p>{comment.comment}</p>
  //                 <p></p>
  //                 <span>{comment.author.username}</span>
  //                 {comment.author._id === sessionStorage.userId && <DeleteAdComment adId={adId} commentId={comment._id} onAdCommentSubmitted={handleAdCommentSubmit} />}
  //             </div>
  //         }
  //         )}

  //     </div>

  // )

  return (
    <div className="AdPageContainer">
      <Title className="AdPageTitle">{ad.title}</Title>
      <div className="AdPageDetails">
        <p className="AdPageAuthor">Posted by: {ad.author.username}</p>
        <p className="AdPageDescription">{ad.description}</p>
        <p className="AdPagePrice">Price: ${ad.price}</p>
        <p className="AdPageDate">
          Posted on: {new Date(ad?.date).toLocaleDateString()}
        </p>
      </div>

      <div className="AdPageCommentsSection">
        <h2 className="AdPageCommentsTitle">Comments</h2>
        <CreateComment
          adId={adId}
          onAdCommentSubmitted={handleAdCommentSubmit}
        />

        <div className="AdPageCommentsList">
          {ad.adcomments.map((comment) => (
            <div key={comment._id} className="AdPageComment">
              <p className="AdPageCommentText">{comment.comment}</p>
              <div className="AdPageCommentFooter">
                <span className="AdPageCommentAuthor">
                  {comment.author.username}
                </span>
                {comment.author._id === sessionStorage.userId && (
                  <DeleteAdComment
                    adId={adId}
                    commentId={comment._id}
                    onAdCommentSubmitted={handleAdCommentSubmit}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to="/" className="AdPageBackButton">
        Back to Ads
      </Link>
    </div>
  );
}

export default AdPage;

//     < CreateComment adId = { adId } onAdCommentSubmitted = { loadAd } />

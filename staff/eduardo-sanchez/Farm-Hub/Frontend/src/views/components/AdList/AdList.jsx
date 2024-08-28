import { useNavigate } from "react-router-dom";
import { Ad } from "../Ad/Ad";
import { Time } from "../../../components/core/Time/Time";
import "./AdList.css";

function AdList({ ads, onAdDeleted }) {
  const navigate = useNavigate();

  if (!ads || ads.length === 0) {
    return <p className="AdListEmpty">No ads found</p>;
  }

  return (
    <div className="AdListContainer">
      <ul className="AdList">
        {ads.map((ad) => (
          <li
            key={ad._id}
            className="AdListItem"
            onClick={() => navigate(`/adpage/${ad._id}`)}
          >
            <div className="AdListItemContent">
              <div className="AdListItemHeader">
                <p className="AdListItemAuthor">Posted by: {ad.author.username}</p>
                <p className="AdListItemDate">{Time(ad.date)}</p>
              </div>
              <p className="AdListItemTitle">{ad.title}</p>
              <p className="AdListItemDescription">{ad.description}</p>
              <p className="AdListItemPrice">{ad.price}</p>
            </div>
            <div className="AdListItemActions">
              {sessionStorage.userId === ad.author._id && (
                <Ad ad={ad} onAdDeleted={onAdDeleted} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdList;





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logic from "../../../logic";

// import "./AdList.css";
// import { Ad } from "../Ad/Ad";
// import { Time } from "../../../components/core/Time/Time";

// function AdList({ adsFiltered, onAdDeleted }) {
//   const navigate = useNavigate();

//   return (

//     <div className="AdListContainer" >

//       <ul className="AdList">
//         {adsFiltered.length > 0 ?
//           adsFiltered.map((ad, index) => (
//             <li
//               key={index}
//               className="AdListItem"
//               onClick={() => navigate(`/adpage/${ad._id}`)}
//             >

//               <div className="AdListItemContent">

//                 <div className="AdListItemHeader">
//                   <p className="AdListItemAuthor">{ad.author.username}</p>

//                   <p className="AdListItemDate">{Time(ad.date)}</p>
//                 </div>

//                 <p className="AdListItemTitle">{ad.title}</p>
//                 <p className="AdListItemDescription">{ad.description}</p>
//                 <p className="AdListItemPrice">{ad.price}</p>
//               </div>

//               <div className="AdListItemActions">
//                 {sessionStorage.userId === ad.author._id && (
//                   <Ad ad={ad} onAdDeleted={onAdDeleted} />
//                 )}
//               </div>
//             </li>
//           )) : <p>"There are no ads..., try again later"</p>}

//       </ul>
//     </div>

//   );
// }
// export default AdList;

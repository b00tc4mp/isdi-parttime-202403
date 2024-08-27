import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logic from "../../../logic";

import "./AdList.css";
import { Ad } from "../Ad/Ad";
import { Time } from "../../../components/core/Time/Time";

function AdList({ adsFiltered, onAdDeleted }) {
  const navigate = useNavigate();

  return (

    <div className="AdListContainer" >

      <ul className="AdList">
        {adsFiltered.length > 0 &&
          adsFiltered.map((ad, index) => (
            <li
              key={index}
              className="AdListItem"
              onClick={() => navigate(`/adpage/${ad._id}`)}
            >

              <div className="AdListItemContent">

                <div className="AdListItemHeader">
                  <p className="AdListItemAuthor">{ad.author.username}</p>

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

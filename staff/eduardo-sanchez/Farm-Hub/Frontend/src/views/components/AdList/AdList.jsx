import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logic from "../../../logic";

import "./AdList.css";
import { Ad } from "../Ad/Ad";
import { Time } from "../../../components/core/Time/Time";

function AdList({ adsFiltered, onAdDeleted }) {
  const navigate = useNavigate();

  return (
    <>
      <ul>
        {adsFiltered.length > 0 &&
          adsFiltered.map((ad, index) => (
            <li
              key={index}
              className="AdContainer"
              onClick={() => navigate(`/adpage/${ad._id}`)}
            >
              <p>{ad.author.username}</p>
              <p>{ad.title}</p>
              <p>{ad.description}</p>
              <p>{ad.price}</p>

              <p>{Time(ad.date)}</p>

              {sessionStorage.userId === ad.author._id && (
                <Ad ad={ad} onAdDeleted={onAdDeleted} />
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
export default AdList;

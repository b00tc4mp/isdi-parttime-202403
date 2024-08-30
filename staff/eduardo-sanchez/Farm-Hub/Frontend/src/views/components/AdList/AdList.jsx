import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Ad } from "../Ad/Ad";
import { Time } from "../../../components/core/Time/Time";
import logic from "../../../logic";
import "./AdList.css";

function AdList({ searchText }) {

  const navigate = useNavigate();

  // const location = useLocation();


  const [ads, setAds] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    console.log("Home -> useEffect")

    setIsLoading(true)
    if (searchText) {
      loadFilteredAds(searchText)
    } else {
      loadAds()
    };
  }, [searchText]);

  const loadFilteredAds = (search) => {
    console.log('texto', search)
    try {
      // if (search.length > 0) {
      logic
        .searchAds(search)
        .then((searchedAds) => {
          setAds(searchedAds);
          setIsLoading(false);

        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
          setIsLoading(false);

        });
      // } else {
      //   setAds([]);
      //   console.log('There are no ads within your search parameters');
      // }
    } catch (error) {
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  const loadAds = () => {
    console.log('I got here')
    try {
      logic
        .getAllAds()
        .then((fetchedAds) => {
          console.log(fetchedAds);
          setAds(fetchedAds);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!ads || ads.length === 0) {
    return <p className="AdListEmpty">There are no ads within your search parameters</p>;
  }

  return (
    <div className="AdListContainer">
      <ul className="AdList">
        {ads.map((ad) => (
          <li
            key={ad._id}
            className="AdListItem"
            onClick={() => navigate(`/adpage/${ad._id}`)}
          // onClick={() => navigate(`/adpage/${ad._id}`, { state: { search: location.search } })}
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
                <Ad ad={ad} onAdDeleted={loadAds} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdList;

/*

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Ad } from "../Ad/Ad";
import { Time } from "../../../components/core/Time/Time";
import logic from "../../../logic";
import "./AdList.css";

function AdList({ searchText }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("AdList -> useEffect");
    setIsLoading(true);
    setError(null);

    const fetchAds = searchText ? () => logic.searchAds(searchText) : logic.getAllAds;

    fetchAds()
      .then((fetchedAds) => {
        setAds(fetchedAds);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [searchText]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="AdListError">Error: {error}</p>;
  }

  if (!ads || ads.length === 0) {
    return <p className="AdListEmpty">There are no ads within your search parameters</p>;
  }

  return (
    <div className="AdListContainer">
      <ul className="AdList">
        {ads.map((ad) => (
          <li
            key={ad._id}
            className="AdListItem"
            onClick={() => navigate(`/adpage/${ad._id}`, { state: { search: location.search } })}
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
                <Ad ad={ad} onAdDeleted={() => setAds(ads.filter(a => a._id !== ad._id))} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdList;
*/
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Ad } from '../Ad/Ad';
import { Time } from '../../../components/core/Time/Time';
import logic from '../../../logic';
import useContext from '../../../useContext';
import './AdList.css';

function AdList({ searchText, userLocation }) {
    const { alert } = useContext();
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        if (searchText && userLocation) {
            loadFilteredAds(searchText, userLocation);
        } else if (!searchText) {
            loadAds();
        }
    }, [searchText, userLocation]);

    const loadFilteredAds = (searchText, userLocation) => {
        try {
            logic
                .searchAds(searchText, userLocation)
                .then((searchedAds) => {
                    setAds(searchedAds);
                    setIsLoading(false);
                })
                .catch((error) => {
                    alert(error.message);
                    setIsLoading(false);
                });
        } catch (error) {
            alert(error.message);
            setIsLoading(false);
        }
    };

    const loadAds = () => {
        try {
            logic
                .getAllAds()
                .then((fetchedAds) => {
                    setAds(fetchedAds);
                    setIsLoading(false);
                })
                .catch((error) => {
                    alert(error.message);
                    setIsLoading(false);
                });
        } catch (error) {
            alert(error.message);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <p className="flex flex-cols relative mt-24 text-xl font-semibold justify-center items-center">
                Loading...
            </p>
        );
    }

    if (!ads || ads.length === 0) {
        return (
            <p className="AdListEmpty">
                No ads found within your search parameters or proximity
            </p>
        );
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
                                <p className="AdListItemAuthor">
                                    {ad.author.username}
                                </p>
                                <p className="AdListItemDate">
                                    {Time(ad.date)}
                                </p>
                            </div>
                            <p className="AdListItemTitle">{ad.title}</p>
                            <p className="AdListItemDescription">
                                {ad.description}
                            </p>
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

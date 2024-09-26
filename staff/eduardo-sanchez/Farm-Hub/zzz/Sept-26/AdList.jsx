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
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('AdList -> useEffect', searchText, userLocation);
        setIsLoading(true);
        setError(null);

        if (searchText && userLocation) {
            loadFilteredAds(searchText, userLocation);
        } else if (!searchText) {
            loadAds();
        }
    }, [searchText, userLocation]);

    const loadFilteredAds = (searchText, userLocation) => {
        console.log('search:', searchText, 'location:', userLocation);
        logic
            .searchAds(searchText, userLocation)
            .then((searchedAds) => {
                setAds(searchedAds);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                setIsLoading(false);
                alert(error.message);
            });
    };

    const loadAds = () => {
        console.log('Loading all ads');
        logic
            .getAllAds()
            .then((fetchedAds) => {
                setAds(fetchedAds);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                setIsLoading(false);
                alert(error.message);
            });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="AdListError">Error: {error}</p>;
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

function Home() {
    const [user, setUser] = useState('');
    const [currentSearchText, setCurrentSearchText] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    const { alert } = useContext();
    const navigate = useNavigate();
    const { search } = useLocation();

    useEffect(() => {
        fetchUsername();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(search);
        const q = searchParams.get('q');
        setCurrentSearchText(q || '');
    }, [search]);

    const fetchUsername = () => {
        logic
            .getUsername()
            .then(setUser)
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };

    const handleSearch = (text) => {
        if (text) {
            navigate(`/?q=${text}`);
        } else {
            navigate('/');
        }
    };

    const handleLocationUpdate = (location) => {
        setUserLocation(location);
    };

    return (
        <>
            <Header user={user} />
            <div className="HomeContainer">
                <main className="Home">
                    <SearchBox
                        onSearch={handleSearch}
                        initialSearchText={currentSearchText}
                        onLocationUpdate={handleLocationUpdate}
                    />
                    <AdList
                        searchText={currentSearchText}
                        userLocation={userLocation}
                    />
                </main>
                <CreateAdButton />
            </div>
        </>
    );
}

export default Home;

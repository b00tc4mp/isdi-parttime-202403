import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logic from "../logic";
import AdList from "./components/AdList/AdList";
import SearchBox from "./components/SearchBox/SearchBox";
import { CreateAdButton } from "./components/CreateAdButton/CreateAdButton";
import Header from "./components/Header/Header";
import "./Home.css";

function Home() {
  const [user, setUser] = useState("");

  const [currentSearchText, setCurrentSearchText] = useState(null);

  const navigate = useNavigate();

  // const location = useLocation()

  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)

  const q = searchParams.get('q')

  useEffect(() => {
    console.log("Home -> useEffect");
    fetchUsername();

  }, []);

  useEffect(() => {
    console.log("Search query changed:", q);
    // setCurrentSearchText(q);
    setCurrentSearchText(q || "");
  }, [q]);


  const fetchUsername = () => {
    try {
      logic
        .getUsername()
        .then((user) => {
          console.log("Home -> setUsername");
          setUser(user);
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleSearch = (text) => {

    if (text) {
      navigate(`/?q=${text}`);

      console.log('entra en el searched text')

    } else {
      navigate('/');

      console.log('no hay text searched')
    }

  }

  return (
    <>
      <Header user={user} />
      <div className="HomeContainer">
        <main className="Home">
          <SearchBox onSearch={handleSearch} initialSearchText={currentSearchText}
          />

          {currentSearchText !== null && <AdList searchText={currentSearchText} />}

        </main>
        <CreateAdButton />
      </div>
    </>
  );
}

export default Home;
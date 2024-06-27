import axios from "axios";
import md5 from "md5";
import { useEffect } from "react";
import { useState } from "react";

const MARVEL_API_URL = "https://gateway.marvel.com:443/v1/public/characters";
const PUBLIC_KEY = "yourpublickey";
const PRIVATE_KEY = "yourprivatekey";

const MarvelCharacter = ({ theme, toggleTheme }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ts = new Date().getTime();
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);

    axios
      .get(MARVEL_API_URL, {
        params: {
          ts,
          apikey: PUBLIC_KEY,
          hash,
        },
      })
      .then((response) => {
        setData(response.data.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <header className="header-container">
        <div className="header-content">
          <h2 className="title">
            <a href="/">Marvel Characters</a>
          </h2>
          <div className="search-container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search for a character..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="toggleBtn" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </header>
      <main>
        {loading ? (
          <div className="loading-message">Loading data, please wait...</div>
        ) : (
          data && (
            <div className="characters-container">
              {data.map((character) => (
                <div key={character.id} className="characters-card">
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                  <div className="card-text">
                    <h2 className="card-title">{character.name}</h2>
                    <p>{character.description || "No description available"}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>
    </>
  );
};

export default MarvelCharacter;

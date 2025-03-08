import { useEffect, useState } from "react";
import "./index.css";
import UnsplashGrid from "./UnsplashGrid";
import PropTypes from "prop-types";

function Unsplash({ setSelected }) {
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [searchPhotos, setSearchPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRandom() {
      try {
        const res = await fetch(
          "https://nerofilm-backend.vercel.app/api/unsplash/random"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch random photos");
        }
        const data = await res.json();
        console.log(data);
        setRandomPhotos(data);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    fetchRandom();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    console.log("handling search for", searchQuery);
    try {
      const res = await fetch(
        `https://nerofilm-backend.vercel.app/api/unsplash/search?query=${searchQuery}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch search photos");
      }
      const data = await res.json();
      console.log("search photos");
      console.log(data);
      setSearchPhotos(data.results);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }

  return (
    <div className="unsplash">
      <form onSubmit={handleSearch}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search for an image"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onSubmit={(e) => handleSearch(e)}
        />
      </form>
      {error ? (
        <div className="unsplash-empty-state">
          <b>Failed to fetch photos from Unsplash</b>
          <p>Please try again later</p>
        </div>
      ) : searchPhotos.length > 0 ? (
        <div>
          <UnsplashGrid images={searchPhotos} setSelected={setSelected} />
        </div>
      ) : (
        <div>
          {randomPhotos.length > 0 ? (
            <UnsplashGrid images={randomPhotos} setSelected={setSelected} />
          ) : (
            <div className="unsplash-empty-state">
              <p>Loading photos...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Unsplash.propTypes = {
  setSelected: PropTypes.func.isRequired,
};

export default Unsplash;

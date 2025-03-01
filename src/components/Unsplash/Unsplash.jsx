import { useEffect, useState } from "react";
import "./index.css";

function Unsplash() {
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [searchPhotos, setSearchPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchRandom() {
      const res = await fetch(
        "https://nerofilm-backend.vercel.app/api/unsplash/random"
      );
      const data = await res.json();
      console.log(data);
      setRandomPhotos(data);
    }
    fetchRandom();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    console.log("handling search for", searchQuery);
    const res = await fetch(
      `https://nerofilm-backend.vercel.app/api/unsplash/search?query=${searchQuery}`
    );
    const data = await res.json();
    console.log("search photos");
    console.log(data);
    setSearchPhotos(data.results);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for an image"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onSubmit={(e) => handleSearch(e)}
        />
        <button type="submit">Search</button>
      </form>
      {searchPhotos.length == 0 ? (
        <ul className="unsplash-grid">
          {randomPhotos.map((photo) => {
            return (
              <li key={photo.id}>
                <img
                  className="unsplash-img"
                  alt={photo.alt_description}
                  src={photo.urls.thumb}
                />
                <p>
                  by{" "}
                  <a
                    target="_blank"
                    href={photo.links.html}
                  >{`${photo.user.first_name} ${photo.user.last_name}`}</a>
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="unsplash-grid">
          {searchPhotos.map((photo) => {
            return (
              <li key={photo.id}>
                <img
                  className="unsplash-img"
                  alt={photo.alt_description}
                  src={photo.urls.thumb}
                />
                <p>
                  by{" "}
                  <a
                    target="_blank"
                    href={photo.links.html}
                  >{`${photo.user.first_name} ${photo.user.last_name}`}</a>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Unsplash;

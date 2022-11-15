import React, { useState, useEffect } from "react";

function UserSelect({ genreOptions }) {
  const [canSubmit, setCanSubmit] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(0);
  const [results, setResults] = useState([]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${currentGenre}&include_adult=false&api_key=a5e87382f2c41fc47e2facb317187475`
    )
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  };

  useEffect(() => {
    setCanSubmit(currentGenre > 0);
  }, [currentGenre]);

  return (
    <>
      <form action="">
        <select
          name=""
          onChange={(event) => setCurrentGenre(event.target.value)}
        >
          <option value="">--please select a genre</option>
          {genreOptions.map((genre, index) => {
            return (
              <option key={index} value={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
        <button onClick={handleOnSubmit} disabled={!canSubmit}>
          HEY JIN
        </button>
      </form>

      {results.length > 0 && (
        <ul>
          {results.map((result, index) => {
            console.log(result);
            return (
              <li key={index}>
                <h2>{result.title}</h2>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt=""
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default UserSelect;

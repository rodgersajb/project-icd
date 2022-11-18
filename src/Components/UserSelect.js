import React, { useState, useEffect } from "react";

function UserSelect({ genreOptions }) {
  const [canSubmit, setCanSubmit] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(0);
  const [results, setResults] = useState([]);
  const [time, setTime] = useState(0);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${currentGenre}&with_runtine.lte=${time}include_video=true&include_adult=true&api_key=a5e87382f2c41fc47e2facb317187475`
    )
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  };

  useEffect(() => {
    setCanSubmit(time > 0 && currentGenre > 0);
  }, [currentGenre, time]);

  console.log(time);

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

        <select name="" onChange={(event) => setTime(event.target.value)}>
          <option value="">--please select a time!--</option>
          <option value="90">Hour and a Half</option>
          <option value="120">Two hours</option>
          <option value="900">All the time in the World</option>
        </select>
        <button onClick={handleOnSubmit} disabled={!canSubmit}>
          HEY JIN
        </button>
      </form>
      {results.length > 0 && (
        <ul>
          {results.map((result, index) => {
            return (
              <li key={index}>
                <h2>{result.title}</h2>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt={result.overview}
                />
                <p>{result.overview}</p>
                <p></p>
                <button>ADD</button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default UserSelect;

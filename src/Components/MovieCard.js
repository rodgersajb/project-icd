import React from "react";

function MovieCard(props) {
  return (
    <>
      <h2>{props.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
        alt={props.overview}
      />
      <p>{props.overview}</p>
    </>
  );
}

export default MovieCard;

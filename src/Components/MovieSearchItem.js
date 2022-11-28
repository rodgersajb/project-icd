import { getDatabase, push, ref } from "firebase/database";
import React from "react";

import firebase from "../firebase";
import MovieCard from "./MovieCard";

function MovieSearchItem(props) {
  const handleAddMovieOnChange = (listId, movieId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${listId}/`);
    push(dbRef);
  };

  return (
    <li key={props.index}>
      <MovieCard {...props.movie} />

      <label htmlFor="add-to-list" onChange={handleAddMovieOnChange}></label>
      <select name="created-lists" id="">
        <option value="">--Add Movie--</option>
        {props.listChoices.map((list) => {
          return <option value={list.key}>{list.name}</option>;
        })}
      </select>
      <button>Add</button>
    </li>
  );
}

export default MovieSearchItem;

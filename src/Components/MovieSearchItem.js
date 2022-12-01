import {
  getDatabase,
  push,
  ref,
  set,
  update,
  onValue,
} from "firebase/database";
import React, { useEffect, useState } from "react";

import database from "../firebase";
import MovieCard from "./MovieCard";

function MovieSearchItem(props) {
  // console.log(props.movie, "This is props.movie");

  console.log(props.listName, "LIST NAME");
  const [selectedList, setSelectedList] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState([]);

  const handleMovieOnChange = (event) => {
    setSelectedList(event.target.value);
  };

  // const movieData = {
  //   title: `${props.movie.original_title}`,

  //   overview: `${props.movie.overview}`,
  // };

  // console.log(`${props.movie.original_title}`, "DID THIS WORK");

  // useEffect(() => {
  //   const dbListRef = ref(database, "props.listName");
  //   onValue(dbListRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const listAdd = data ? Object.values(data) : [];
  //     setSelectedMovie(listAdd);
  //   });
  // }, [selectedMovie]);

  useEffect(() => {
    const dbMovieRef = ref(database, `/${selectedList}`);
    onValue(dbMovieRef, (snapshot) => {
      const data = snapshot.val();

      const movieAdd = data
        ? Object.values(data)
            .map((key) => {
              return { id: key, ...data[key] };
            })
            .sort((a, b) => {
              return a - b;
            })
        : [];
      setSelectedList(selectedList);
      console.log(selectedList, "SELECTED LIST");

      console.log(movieAdd, "MOVIE ADDITION");
    });
  }, [selectedList]);

  const handleOnSubmitChange = (event) => {
    event.preventDefault();
    const listRef = ref(database, `props.listName/${selectedList}/`);
    console.log(listRef, "LIST REF");
    update(listRef, {
      title: props.movie.original_title,
      overview: props.movie.overview,
    });
  };

  // const handleOnSubmitChange = (event) => {
  //   // event.preventDefault();
  //   const dbListRef = ref(database, `/${selectedList}`);
  //   onValue(dbListRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data);
  //   });
  // };

  // const handleOnSubmit = (event) => {
  //   event.preventDefault();

  //   // onValue(dbListRef, (response) => {
  //   //   const data = response.val();
  //   //   data.push(movieData);
  //   // });
  //   // console.log(dbListRef);
  // };

  // const addToList = (event) => {
  //   event.preventDefault();
  //   const listRef = ref(database, `/${selectedList}/`);
  //   push(listRef, {
  //     title: props.movie.original_title,
  //     overview: props.movie.overview,
  //   });
  // };

  return (
    <>
      <li key={props.index}>
        <MovieCard {...props.movie} />

        <label htmlFor="add-to-list"></label>
        <select onChange={handleMovieOnChange} name="created-lists" id="">
          <option value="">--Add Movie--</option>
          {props.listChoices.map((list) => {
            return <option value={list.key}>{list.name}</option>;
          })}
        </select>
        <button onClick={handleOnSubmitChange}>Add</button>
      </li>
      {/* <h2>
        {movieData.map((data) => {
          return (
            <ul>
              <li>
                <p>{data.title}</p>
                <p>{data.overview}</p>
              </li>
            </ul>
          );
        })}
      </h2> */}
    </>
  );
}

export default MovieSearchItem;

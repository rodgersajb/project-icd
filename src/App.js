import { useEffect, useState } from "react";
import "./App.css";
import UserSelect from "./Components/UserSelect";
import CreatedLists from "./Components/CreatedLists";
import Footer from "./Components/Footer";

// Get Api call for genres and its id
// pass time options and genres/id as props to UserSelect Component
// Select useState set to false
// Select method that must have an id and genre more than 1, if true set useState to true

function App() {
  const [genreOptions, setGenreOptions] = useState([]);

  // const [genreId, setGenreId] = useState(0)

  // const apiKey = "a5e87382f2c41fc47e2facb317187475";

  useEffect(() => {
    // const url = new URL("https://api.themoviedb.org/3//genre/movie/list");

    // url.search = new URLSearchParams({
    //   api_key = apiKey,

    // })
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=a5e87382f2c41fc47e2facb317187475`
    )
      .then((response) => response.json())
      .then((data) => setGenreOptions(data.genres));
  }, []);

  return (
    <div className="App">
      <UserSelect genreOptions={genreOptions} />
      <CreatedLists />
      <Footer />
    </div>
  );
}

export default App;

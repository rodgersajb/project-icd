import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "../firebase";

const CreatedLists = () => {
  const [lists, setLists] = useState({});
  const [value, setValue] = useState('')

  const handleListSubmit = (event) => {
    event.preventDefault();
    const newValue = value;
    setLists(newValue);


  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      console.log(response.val(), "firebase response");
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push(data[key]);
      }

      setLists(newState);
    });
  }, []);

  return (
    <>
      <label htmlFor="list">Create a List</label>
      <input
        type="text"
        onChange={handleChange}
        id="list"
        minLength="3"
        maxLength="12"
        s
      />
      <button onSubmit={handleListSubmit}>Create!</button>
      {lists.length > 0 && (
        <ul>
          {lists.map((list, index) => {
            return <li key={index} value={list}></li>;
          })}
        </ul>
      )}
    </>
  );
};

export default CreatedLists;

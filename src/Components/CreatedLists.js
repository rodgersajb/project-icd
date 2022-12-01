import { useState, useEffect, useContext } from "react";
import { ref, onValue, push, remove } from "firebase/database";
import database from "../firebase";
import { ListContext } from "../Contexts/ListContext";

const CreatedLists = () => {
  const { lists, setLists, listName, setListName } = useContext(ListContext);

  //   const [lists, setLists] = useState([]);
  //   const [listName, setListName] = useState("");
  const [userCanSubmit, setUserCanSubmit] = useState(false);
  const minListName = 3;
  const maxListName = 20;

  useEffect(() => {
    // database details stored in variable
    const dbRef = ref(database);

    onValue(dbRef, (response) => {
      const newState = [];

      const data = response.val();

      for (let key in data) {
        newState.push({ key: key, name: data[key] });
      }

      setLists(newState);
    });
  }, [setLists]);

  useEffect(() => {
    setUserCanSubmit(
      listName.length > minListName && listName.length < maxListName
    );
  }, [listName]);

  const handleListSubmit = (event) => {
    console.log("event", event);
    // reference firebase and then push whatever is dynamically created to firebase
    event.preventDefault();

    //firebase reference stored in variable
    const dbRef = ref(database);

    //PUSH

    push(dbRef, listName);

    setListName("");
  };

  const handleListChange = (event) => {
    setListName(event.target.value);
  };

  // reference database and create a remove lists button when lists are created

  const handleListRemove = (listId) => {
    const dbRef = ref(database, `/${listId}`);
    remove(dbRef);
  };

  return (
    <>
      <form onSubmit={handleListSubmit}>
        <label htmlFor="newList">Create a List</label>
        <input
          type="text"
          onChange={handleListChange}
          value={listName}
          id="newList"
          minLength="3"
          maxLength="30"
        />
        <button type="submit" disabled={!userCanSubmit}>
          Create!
        </button>
      </form>
      {lists.length > 0 && (
        <ul>
          {lists.map((list) => {
            return (
              <li key={list.key}>
                <p>{list.name}</p>
                <button onClick={() => handleListRemove(list.key)}>
                  {" "}
                  Remove{" "}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CreatedLists;

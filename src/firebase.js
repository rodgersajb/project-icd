// firebase.js
import { initializeApp } from "firebase/app";

// Initialize Firebase
// *** USE YOUR CONFIG OBJECT ***
const config = {
  apiKey: "AIzaSyDkcaE9euQ2kRAbmAMUi9PSeNsmNdd4hGM",
  authDomain: "i-cannot.firebaseapp.com",
  projectId: "i-cannot",
  storageBucket: "i-cannot.appspot.com",
  messagingSenderId: "634518438257",
  appId: "1:634518438257:web:5d8e113ae110d9a2d536d0",
};

// setting a variable that initializes our application
const firebase = initializeApp(config);
// this exports the CONFIGURED version of firebase
export default firebase;

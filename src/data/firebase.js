import firebase from "firebase";
import apiKeys from "./secrets";

firebase.initializeApp({
  apiKey: apiKeys.firebase,
  authDomain: "intergalactic-visitors-system.firebaseapp.com",
  databaseURL: "https://intergalactic-visitors-system.firebaseio.com",
  projectId: "intergalactic-visitors-system",
  storageBucket: "intergalactic-visitors-system.appspot.com",
  messagingSenderId: "802241710799"
});

export default firebase;

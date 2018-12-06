import firebase from 'firebase';

// Initialize Firebase
var config = {
apiKey: "AIzaSyCmIY5XWzXpf_03MbLzqVmk-umR3zVvjaY",
authDomain: "project6-ivs.firebaseapp.com",
databaseURL: "https://project6-ivs.firebaseio.com",
projectId: "project6-ivs",
storageBucket: "project6-ivs.appspot.com",
messagingSenderId: "336359386002"
};
firebase.initializeApp(config);

export default firebase;
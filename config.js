import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBex0g7N1IpVhPN2OjjUJQADJmiQeXvXYQ",
  authDomain: "book-santa2.firebaseapp.com",
  databaseURL: "https://book-santa2.firebaseio.com",
  projectId: "book-santa2",
  storageBucket: "book-santa2.appspot.com",
  messagingSenderId: "771903010833",
  appId: "1:771903010833:web:97494953607423d57359b0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

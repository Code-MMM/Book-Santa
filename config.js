import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyB67AetZ1_e39rKKCAY43TBtgAuHsmy5xE",
  authDomain: "book-santa-3.firebaseapp.com",
  projectId: "book-santa-3",
  storageBucket: "book-santa-3.appspot.com",
  messagingSenderId: "649567811755",
  appId: "1:649567811755:web:da6e72f95fe8c8ec0adfee",
  measurementId: "G-EBJ7GTPFW6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase


export default firebase.firestore();

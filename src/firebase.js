import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBeoXJ-03XhRzjseaXhhZFHtAZAKLBbijw",
  authDomain: "discord-clone-laduha.firebaseapp.com",
  databaseURL: "https://discord-clone-laduha.firebaseio.com",
  projectId: "discord-clone-laduha",
  storageBucket: "discord-clone-laduha.appspot.com",
  messagingSenderId: "483641758374",
  appId: "1:483641758374:web:87e315ae83421b0eee1a67",
  measurementId: "G-EYW0S5H1HW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
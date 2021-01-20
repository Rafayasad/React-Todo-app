// import firebase from 'firebase';
import firebase from 'firebase/app';
// import * as firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyDQgIU_54tu48H4HtqCPJkEgw_IlVUPyGc",
    authDomain: "react-todo-7e741.firebaseapp.com",
    projectId: "react-todo-7e741",
    storageBucket: "react-todo-7e741.appspot.com",
    messagingSenderId: "938035389555",
    appId: "1:938035389555:web:46f1b467d66e32ecee3606",
    measurementId: "G-L24WNWQJ61"
  };
  // Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
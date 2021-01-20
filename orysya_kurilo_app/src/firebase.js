import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseProperties = firebaseDB.ref("properties");
const firebaseContact = firebaseDB.ref("contact");

export { firebase, firebaseProperties, firebaseContact, firebaseDB };

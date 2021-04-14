import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCykBvovJRU9dpfwWl7jzDfpPX8rdOCDYA",
  authDomain: "tubeadsfinder.firebaseapp.com",
  projectId: "tubeadsfinder",
  storageBucket: "tubeadsfinder.appspot.com",
  messagingSenderId: "322628475764",
  appId: "1:322628475764:web:70062c5e7bab1371b02a21",
  measurementId: "G-L4FWQCJFYV"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const authFirebase = firebase.auth();
const storage = firebase.storage();

export { db, authFirebase, firebase, storage };
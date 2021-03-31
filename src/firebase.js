import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2mHDa7wfQu77ClHO8ce0YUqiJnSfwKlo",
  authDomain: "shoppers-admin-3c5d3.firebaseapp.com",
  projectId: "shoppers-admin-3c5d3",
  storageBucket: "shoppers-admin-3c5d3.appspot.com",
  messagingSenderId: "1099422533584",
  appId: "1:1099422533584:web:0a0aa6e0385419be1a5bd5",
  measurementId: "G-RJTJJPLYH8",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
const auth = firebase.auth();
export default auth;
// export default storage;

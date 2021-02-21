import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLAqJDYqXeHwZrxdECBczEdW5Npv-3618",
  authDomain: "shoppers-7a58a.firebaseapp.com",
  projectId: "shoppers-7a58a",
  storageBucket: "shoppers-7a58a.appspot.com",
  messagingSenderId: "394756975100",
  appId: "1:394756975100:web:61ff6c54b4a9e649c4ea79",
  measurementId: "G-T5DFD0ZJLT",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export { auth };

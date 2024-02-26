import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLY7IxfQEDhBSZRF_cs43yzYr4kFIxIQE",
  authDomain: "culdesac-781c0.firebaseapp.com",
  projectId: "culdesac-781c0",
  storageBucket: "culdesac-781c0.appspot.com",
  messagingSenderId: "788198090814",
  appId: "1:788198090814:web:b2d01bcc6593900622c96f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

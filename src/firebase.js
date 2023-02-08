// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCXibwov1bdsmoHpH7zXcNzFzurdYigtss",
  authDomain: "challenge-d3d6a.firebaseapp.com",
  projectId: "challenge-d3d6a",
  storageBucket: "challenge-d3d6a.appspot.com",
  messagingSenderId: "497619640108",
  appId: "1:497619640108:web:3f94d5c2c3d06520b75689",
  measurementId: "G-VQZ1RW3Q72"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };

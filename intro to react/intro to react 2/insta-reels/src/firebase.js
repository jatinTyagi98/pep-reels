
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBB_eHa3hH6bq99ApLRmF7t_PZK2Vu2K1U",
    authDomain: "reels-proj.firebaseapp.com",
    projectId: "reels-proj",
    storageBucket: "reels-proj.appspot.com",
    messagingSenderId: "587640617060",
    appId: "1:587640617060:web:1c1dc3eb77be8b81568771"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();


export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage()
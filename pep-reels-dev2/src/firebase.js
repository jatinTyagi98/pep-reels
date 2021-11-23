
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB407cb-3f78P-0hsvNjS_q4KOn-onzqsU",
    authDomain: "pep-reels.firebaseapp.com",
    databaseURL: "https://pep-reels-default-rtdb.firebaseio.com",   
    projectId: "pep-reels",
    storageBucket: "pep-reels.appspot.com",
    messagingSenderId: "975387878030",
    appId: "1:975387878030:web:0eb82c08a66b881174dfdf"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();


export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp   
}

export const storage = firebase.storage()
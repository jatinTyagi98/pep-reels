
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBw5JYyymDl-M4gqaJbiY3s-Ivl3k2A1IY",
    authDomain: "reels-7f850.firebaseapp.com",
    projectId: "reels-7f850",
    storageBucket: "reels-7f850.appspot.com",
    messagingSenderId: "267531186711",
    appId: "1:267531186711:web:242328a3a3a29fac90e252"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();

export const database = {
    users: firestore.collection('users'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp   
}

export const storage = firebase.storage()
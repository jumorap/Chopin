import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
import "firebase/analytics"



var firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: "redboardun.com",
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
};


export let firebaseInitApp;

// Initialize firebaseSelf
if (!firebase.apps.length) firebaseInitApp = firebase.initializeApp(firebaseConfig);
// if already initialized, use that one
else firebaseInitApp = firebase.app();


// Auth factor
export const firebaseAppAuth = firebaseInitApp.auth();
export const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};


// DB firestorage
export const db = firebase.firestore();
export const storage = firebase.storage();

// Google Analytics
export const firebaseAnalytics = firebase.analytics();

export default firebaseConfig;


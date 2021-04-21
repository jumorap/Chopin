var firebaseConfig = {
    apiKey: "AIzaSyD8TsjByeLBm65H3RyrJ11gyiucmceI0YE",
    authDomain: "red-board-70d99.firebaseapp.com",
    databaseURL: "https://red-board-70d99-default-rtdb.firebaseio.com",
    projectId: "red-board-70d99",
    storageBucket: "red-board-70d99.appspot.com",
    messagingSenderId: "418211670011",
    appId: "1:418211670011:web:38f96f43a16020a416cd5e",
    measurementId: "G-TXX9Q3017X"
  };
  // Initialize Firebase
  const db = firebase.initializeApp(firebaseConfig);
  export default db;
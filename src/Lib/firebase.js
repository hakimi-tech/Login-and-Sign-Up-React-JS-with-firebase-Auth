// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyBroPI3HnHt5P3-ICZpTDFy01FAz_A-Pwc",
    authDomain: "myreact-4d4d5.firebaseapp.com",
    projectId: "myreact-4d4d5",
    storageBucket: "myreact-4d4d5.appspot.com",
    messagingSenderId: "720250024994",
    appId: "1:720250024994:web:f10899565918326c88067b"
};

const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
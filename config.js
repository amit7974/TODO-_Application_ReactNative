import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig={
    apiKey: "AIzaSyDoSvGp6bxn0eJ1OHiYvKJxOrh2Xriwag4",
    authDomain: "mahadev-7c976.firebaseapp.com",
    projectId: "mahadev-7c976",
    storageBucket: "mahadev-7c976.appspot.com",
    messagingSenderId: "543798070418",
    appId: "1:543798070418:web:6f5b4d616669aecedbea4b",
    measurementId: "G-5KFQBD2KXK"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
export { firebase };

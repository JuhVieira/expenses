import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAHUYq0tNv8ZYIKJoeWX77ueKAZr4ptDfM",
    authDomain: "expenses-b1314.firebaseapp.com",
    databaseURL: "https://expenses-b1314.firebaseio.com",
    projectId: "expenses-b1314",
    storageBucket: "",
    messagingSenderId: "1033619373903",
    appId: "1:1033619373903:web:04e35c08b5612ac6"
};
firebase.initializeApp(config);

export default firebase
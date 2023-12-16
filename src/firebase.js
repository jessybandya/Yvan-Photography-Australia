import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz32QzTg0a7iIuDrcEw3ZkmDZoNoLWXek",
  authDomain: "yvan-app.firebaseapp.com",
  projectId: "yvan-app",
  storageBucket: "yvan-app.appspot.com",
  messagingSenderId: "1020215130344",
  appId: "1:1020215130344:web:8b577ad206124d1f84715d",
  measurementId: "G-87BB37N6E8"
};

  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};

import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4tE3mwhcMO0v_f2MCIEuZciSNYCccvrc",
    authDomain: "react-image-82a7f.firebaseapp.com",
    databaseURL: "https://react-image-82a7f.firebaseio.com",
    projectId: "react-image-82a7f",
    storageBucket: "react-image-82a7f.appspot.com",
    messagingSenderId: "1099058345774"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }
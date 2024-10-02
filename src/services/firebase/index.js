import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBOUnSoyjLoiSlkRpy-2doV7DrfFsrBxbQ",
  authDomain: "jira-f512c.firebaseapp.com",
  databaseURL: "https://jira-f512c-default-rtdb.firebaseio.com",
  projectId: "jira-f512c",
  storageBucket: "jira-f512c.appspot.com",
  messagingSenderId: "790675547152",
  appId: "1:790675547152:web:afd2e26520c46257695695",
  measurementId: "G-YPFTVJ7YFM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{
    auth
};

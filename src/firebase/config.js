// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpKdESnUoWMB_GLLaDUpbF1PNuKlBxLaY",
  authDomain: "miniblog-3c412.firebaseapp.com",
  projectId: "miniblog-3c412",
  storageBucket: "miniblog-3c412.appspot.com",
  messagingSenderId: "435063106870",
  appId: "1:435063106870:web:eb72dd359f438910265797"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//INICIALIZANDO O BANCO DE DADOS
const db = getFirestore(app);

export {db};
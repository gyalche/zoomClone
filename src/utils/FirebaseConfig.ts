// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0cYnNeYwLMuEpLEBXNXODWmiJUTRojDE',
  authDomain: 'zoom-clone-f33fe.firebaseapp.com',
  projectId: 'zoom-clone-f33fe',
  storageBucket: 'zoom-clone-f33fe.appspot.com',
  messagingSenderId: '723175873441',
  appId: '1:723175873441:web:75907de87fcad6a35449e0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, 'user');

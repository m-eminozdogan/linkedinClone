// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDF8r2cvF2VNNHqwL5Vg4zl-csp60dY5fU",
  authDomain: "linkedin-clone-c6fd7.firebaseapp.com",
  projectId: "linkedin-clone-c6fd7",
  storageBucket: "linkedin-clone-c6fd7.appspot.com",
  messagingSenderId: "1050177696655",
  appId: "1:1050177696655:web:e37fd47f57a4f8f89051fa",
  measurementId: "G-S1TGHYDR43"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();
const storage = getStorage(app);
//const analytics = getAnalytics(app);
export { auth, provider, storage };
export default db;
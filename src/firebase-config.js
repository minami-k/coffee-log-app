import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaZxeB_pi5soQ1qQLjr8aPrkqo-deBK-I",
  authDomain: "coffee-log-f11a1.firebaseapp.com",
  projectId: "coffee-log-f11a1",
  storageBucket: "coffee-log-f11a1.appspot.com",
  messagingSenderId: "330352543486",
  appId: "1:330352543486:web:47a9d142d6296842f907af",
};

let firebaseCache;

export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

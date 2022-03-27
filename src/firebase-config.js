import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmdrXPPmy4-lbXSTJFjXRasPzyc_i4pJM",
  authDomain: "crud-blog-62f73.firebaseapp.com",
  projectId: "crud-blog-62f73",
  storageBucket: "crud-blog-62f73.appspot.com",
  messagingSenderId: "737608083686",
  appId: "1:737608083686:web:90850f12b716e77fe7b327"
};

let firebaseCache;

export const getFirebase = () => {
  if(firebaseCache){
    return firebaseCache
  }
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const storage = getStorage(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()


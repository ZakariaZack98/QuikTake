import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyBoEM2W7XEs38xuA40XTSISXPio4hh65-4",
  authDomain: "quiktake-2934e.firebaseapp.com",
  projectId: "quiktake-2934e",
  storageBucket: "quiktake-2934e.firebasestorage.app",
  messagingSenderId: "790601660059",
  appId: "1:790601660059:web:79891d171d1720bb0d783e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db }
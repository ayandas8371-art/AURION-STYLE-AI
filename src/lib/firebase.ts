import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBOb_T1IHA0kvVzKPMF6M_qy7y72OLit3E",
    authDomain: "fashion-app-46bce.firebaseapp.com",
    projectId: "fashion-app-46bce",
    storageBucket: "fashion-app-46bce.firebasestorage.app",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:690698593128:android:f6043e7d6ffde86b67ecdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const isConfigured = () => {
    return firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";
};

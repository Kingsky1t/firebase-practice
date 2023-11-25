import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCtyg2nKdaMFEoRqMLDhBOEcKfOPLSFDyo",
    authDomain: "fir-practice-b1eca.firebaseapp.com",
    projectId: "fir-practice-b1eca",
    storageBucket: "fir-practice-b1eca.appspot.com",
    messagingSenderId: "957838971994",
    appId: "1:957838971994:web:662b9eaa64283c159a7463",
    measurementId: "G-74JYLTXYQ6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
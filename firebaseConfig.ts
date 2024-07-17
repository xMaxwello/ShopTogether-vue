import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD2sNHUhktsayMZa2b7Grk0auXpLC8ZAA8",
    authDomain: "vue-shoptogether.firebaseapp.com",
    projectId: "vue-shoptogether",
    storageBucket: "vue-shoptogether.appspot.com",
    messagingSenderId: "48337489018",
    appId: "1:48337489018:web:22ceccc197877444debfc3",
    measurementId: "G-052HFE8919"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };

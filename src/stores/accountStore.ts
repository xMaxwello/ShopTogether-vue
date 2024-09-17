import { reactive } from 'vue';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDoc, doc, onSnapshot} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const state = reactive({
    user: {
        firstName: '',
        lastName: '',
    },
});

const fetchUserData = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const userDocRef = doc(db, 'users', user.uid);

        // Set up a real-time listener
        onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                state.user.firstName = userData?.firstName || '';
                state.user.lastName = userData?.lastName || '';
            }
        });
    }
};


const listenToAuthStateChanges = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchUserData();
        } else {
            state.user.firstName = '';
            state.user.lastName = '';  // Reset user data on logout
        }
    });
};

listenToAuthStateChanges();

export default {
    state,
    fetchUserData,
};

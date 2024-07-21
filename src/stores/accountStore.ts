import { reactive } from 'vue';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const state = reactive({
    user: {
        firstName: '',
        lastName: '',
    },
});

const fetchUserData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            state.user.firstName = userDoc.data().firstName || '';
            state.user.lastName = userDoc.data().lastName || '';
        }
    }
};

export default {
    state,
    fetchUserData,
};

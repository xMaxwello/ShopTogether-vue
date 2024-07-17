import { createUserWithEmailAndPassword , signInWithEmailAndPassword ,signOut} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const registerUser = async (email, password, firstName, lastName) => {
    if (!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required');
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
            firstName: firstName || '',
            lastName: lastName || '',
            uid: user.uid,
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
};

export { registerUser, logoutUser, loginUser };

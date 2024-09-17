import { createUserWithEmailAndPassword , signInWithEmailAndPassword ,signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import {doc, setDoc, onSnapshot, getDoc} from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import type { User } from '@/models/myUser';

const registerUser = async (email: string, password: string, firstName: string, lastName: string): Promise<User> => {
    if (!firstName || !lastName || !email || !password) {
        throw new Error('All fields are required');
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData: User = {
            firstName,
            lastName,
            email: user.email || '',
            uid: user.uid,
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        return userData;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const loginUser = async (email: string, password: string): Promise<User> => {
    try {
        await setPersistence(auth, browserLocalPersistence);

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const idToken = await user.getIdToken();
        localStorage.setItem('userToken', idToken);

        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            throw new Error('User document not found');
        }

        const userData = userDocSnap.data() as User;
        return userData;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const getCurrentUser = () => {
    return new Promise<User>((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                onSnapshot(userDocRef, (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        resolve(docSnapshot.data() as User);
                    } else {
                        reject('User document not found');
                    }
                });
            } else {
                reject('No user is currently logged in');
            }
        });
    });
};

const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export { registerUser, logoutUser, loginUser, getCurrentUser };

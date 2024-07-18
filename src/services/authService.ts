import { createUserWithEmailAndPassword , signInWithEmailAndPassword ,signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, onSnapshot  } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const registerUser = async (email: string, password: string, firstName: string, lastName: string) => {
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

const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                onSnapshot(userDocRef, (docSnapshot) => {
                    if (docSnapshot.exists()) {
                        resolve(docSnapshot.data());
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
    } catch (error) {
        throw new Error(error.message);
    }
};

export { registerUser, logoutUser, loginUser, getCurrentUser };

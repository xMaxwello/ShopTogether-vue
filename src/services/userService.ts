import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser, sendEmailVerification  } from 'firebase/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const updateUserProfile = async (uid: string, firstName: string, lastName: string) => {
    try {
        console.log(`Updating user profile: UID=${uid}, FirstName=${firstName}, LastName=${lastName}`);
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, { firstName, lastName });
    } catch (error) {
        throw new Error(error.message);
    }
};

const reauthenticateUser = async (currentEmail: string, password: string) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(currentEmail, password);
    try {
        await reauthenticateWithCredential(user, credential);
    } catch (error) {
        throw new Error('Reauthentication failed: ' + error.message);
    }
};

const updateUserEmail = async (newEmail: string) => {
    const user = auth.currentUser;
    try {
        if (!user.emailVerified) {
            throw new Error('Please verify your current email address before changing to a new one.');
        }

        await updateEmail(user, newEmail);
        await sendEmailVerification(user);
        alert('Verification email sent to the new email address. Please verify to complete the email update.');
    } catch (error) {
        throw new Error('Email update failed: ' + error.message);
    }
};

const updateUserPassword = async (currentEmail: string, currentPassword: string, newPassword: string) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(currentEmail, currentPassword);
    try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
    } catch (error) {
        throw new Error('Password update failed: ' + error.message);
    }
};

const deleteUserAccount = async (currentEmail: string, password: string) => {
    const user = auth.currentUser;
    const uid = user.uid;
    const credential = EmailAuthProvider.credential(currentEmail, password);
    try {
        await reauthenticateWithCredential(user, credential);

        const userDocRef = doc(db, 'users', uid);
        await deleteDoc(userDocRef);

        await deleteUser(user);
    } catch (error) {
        throw new Error('Account deletion failed: ' + error.message);
    }
};

export { updateUserProfile, updateUserEmail, updateUserPassword, deleteUserAccount , reauthenticateUser};

import { db } from '@/../firebaseConfig';
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Item } from '@/models/myItem';

export const fetchItems = async (groupId: string): Promise<Item[]> => {
    const querySnapshot = await getDocs(collection(db, 'groups', groupId, 'products'));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Item));
};

// Function to add a new item to a group
export const addItemToGroup = async (groupId, itemData) => {
    const collectionRef = collection(db, 'groups', groupId, 'products');
    const { id, ...dataWithoutId } = itemData;  // Exclude id if it accidentally comes in itemData

    try {
        const docRef = await addDoc(collectionRef, dataWithoutId);
        await updateDoc(docRef, { id: docRef.id }); // Optionally update if you need to store the generated id back into the document
        return { ...dataWithoutId, id: docRef.id };
    } catch (error) {
        console.error('Error adding new item to group:', error);
        throw error;  // Re-throw to handle it elsewhere
    }
};


export const updateItemCount = async (groupId: string, itemId: string, delta: number): Promise<number> => {
    const itemDocRef = doc(db, 'groups', groupId, 'products', itemId);
    const itemSnap = await getDoc(itemDocRef);
    if (!itemSnap.exists()) throw new Error('Item not found');

    const newCount = itemSnap.data().productCount + delta;
    if (newCount < 1) throw new Error('Count cannot be less than 1');

    await updateDoc(itemDocRef, { productCount: newCount });
    return newCount;
};

export const updateItemInGroup = async (groupId, itemData) => {
    if (!itemData.id) {
        throw new Error('Item ID is required for updating.');
    }

    // Constructing the document reference correctly using groupId
    const itemDocRef = doc(db, 'groups', groupId, 'products', itemData.id);
    console.log(`Attempting to update document at path: ${itemDocRef.path}`);

    try {
        await updateDoc(itemDocRef, {
            productName: itemData.productName,
            productDescription: itemData.productDescription,
            productVolume: itemData.productVolume,
            // Include other fields as necessary
        });
        console.log('Item updated successfully');
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;  // Re-throw the error to handle it in the calling function
    }
};


export const deleteItem = async (groupId: string, itemId: string): Promise<void> => {
    const itemDocRef = doc(db, 'groups', groupId, 'products', itemId);
    await deleteDoc(itemDocRef);
};

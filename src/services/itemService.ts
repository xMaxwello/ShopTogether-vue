import { db } from '@/../firebaseConfig';
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Item } from '@/models/myItem';

export const fetchItems = async (groupId: string): Promise<Item[]> => {
    const querySnapshot = await getDocs(collection(db, 'groups', groupId, 'products'));
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Item));
};

export const addItemToGroup = async (groupId: string, itemData: Omit<Item, 'id'>): Promise<Item> => {
    const collectionRef = collection(db, 'groups', groupId, 'products');
    const docRef = await addDoc(collectionRef, itemData);
    await updateDoc(docRef, { id: docRef.id });
    return { ...itemData, id: docRef.id };
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

export const deleteItem = async (groupId: string, itemId: string): Promise<void> => {
    const itemDocRef = doc(db, 'groups', groupId, 'products', itemId);
    await deleteDoc(itemDocRef);
};

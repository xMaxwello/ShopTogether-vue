import { defineStore } from 'pinia';
import { db } from '@/../firebaseConfig';
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Item } from '@/models/myItem';

export const useItemsStore = defineStore('itemsStore', {
    state: () => ({
        items: [] as Item[],
    }),
    actions: {
        async fetchItems(groupId: string) {
            const querySnapshot = await getDocs(collection(db, 'groups', groupId, 'products'));
            this.items = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Item));
        },
        async addItemToGroup(groupId, itemData: Omit<Item, 'id'>): Promise<Item> {
            const collectionRef = collection(db, 'groups', groupId, 'products');
            const docRef = await addDoc(collectionRef, itemData);
            await updateDoc(docRef, { id: docRef.id });
            const newItem = { ...itemData, id: docRef.id };
            this.items.push(newItem); // Update the store's state
            return newItem;
        },
        async updateItemInGroup(groupId, itemData: Item) {
            if (!itemData.id) {
                throw new Error('Item ID is required for updating.');
            }
            const itemDocRef = doc(db, 'groups', groupId, 'products', itemData.id);
            await updateDoc(itemDocRef, {
                productName: itemData.productName,
                productDescription: itemData.productDescription,
                productVolume: itemData.productVolume,
            });

            // Find the index of the item and update it
            const index = this.items.findIndex(item => item.id === itemData.id);
            if (index !== -1) {
                this.items[index] = itemData;
            }
        },
        async deleteItem(groupId: string, itemId: string) {
            const itemDocRef = doc(db, 'groups', groupId, 'products', itemId);
            await deleteDoc(itemDocRef);
            this.items = this.items.filter(item => item.id !== itemId); // Update the store's state
        },
    },
});

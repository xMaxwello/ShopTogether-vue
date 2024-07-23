<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonContent, IonPage, IonSearchbar, IonActionSheet } from '@ionic/vue';
import ItemCard from '@/compontents/ItemCard.vue';
import SheetComponent from '@/compontents/SheetComponent.vue';
import SearchResultsModal from '@/compontents/SearchResultComponent.vue';
import { fetchItems, addItemToGroup, updateItemCount, deleteItem } from '@/services/itemService';
import { getCurrentUser } from '@/services/authService';
import { searchProducts, fetchProductDetails } from '@/services/openFoodFactsService';
import { trash } from "ionicons/icons";
import type { Item } from '@/models/myItem';
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";


const route = useRoute();
const groupId = route.params.groupId as string;
const groupName = ref('');
const searchQuery = ref('');
const isModalOpen = ref(false);
const items = ref<Item[]>([]);
const showActionSheet = ref(false);
const selectedItemID = ref<string | null>(null);
const selectedProduct = ref<Item | null>(null);
const searchResults = ref([]);

const sheetComponentRef = ref(null);

const fetchGroupItems = async () => {
  try {
    items.value = await fetchItems(groupId);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

const fetchGroupDetails = async () => {
  try {
    const groupDocRef = doc(db, 'groups', groupId);
    const groupDoc = await getDoc(groupDocRef);
    if (groupDoc.exists()) {
      groupName.value = groupDoc.data().groupName;
    }
  } catch (error) {
    console.error('Error fetching group details:', error);
  }
};

const handleKeyPress = async (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    try {
      console.log('Searching for:', searchQuery.value); // Debug log
      searchResults.value = await searchProducts(searchQuery.value);
      console.log('Search results:', searchResults.value); // Debug log
      isModalOpen.value = true;
    } catch (error) {
      console.error('Error searching products:', error);
    }
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};

const addItem = async (item) => {
  try {
    const user = await getCurrentUser();
    const newItem = await addItemToGroup(groupId, {
      barcode: item.code,
      productCount: 1,
      productDescription: '',
      productID: item.code,
      productName: item.product_name,
      productImageUrl: item.image_url,
      productVolume: item.product_volume || 'N/A', // Default value if undefined
      selectedUserUUID: user.uid
    });
    items.value.push(newItem);
    isModalOpen.value = false; // Close the modal after adding the item
  } catch (error) {
    console.error('Error adding item to group:', error);
  }
};


const showDeleteActionSheet = (productId: string) => {
  selectedItemID.value = productId;
  showActionSheet.value = true;
};

const handleDeleteItem = async () => {
  if (!selectedItemID.value) return;

  try {
    await deleteItem(groupId, selectedItemID.value);
    items.value = items.value.filter(item => item.id !== selectedItemID.value);
    showActionSheet.value = false;
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const handleUpdateItemCount = async ({ item, delta }: { item: Item, delta: number }) => {
  try {
    const newCount = await updateItemCount(groupId, item.id, delta);
    item.productCount = newCount;
  } catch (error) {
    console.error('Error updating item count:', error);
  }
};

const openDetailModal = async (item: Item) => {
  try {
    const productDetails = await fetchProductDetails(item.barcode);
    selectedProduct.value = { ...item, ...productDetails };
    sheetComponentRef.value.openModal();
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

onMounted(async () => {
  await fetchGroupDetails();
  await fetchGroupItems();
});
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="w-full h-full px-4 bg-white flex flex-col items-center">
        <h1 class="text-black text-[32px] py-10">{{ groupName }}</h1>
        <ion-searchbar
            class="custom w-full my-4 text-black"
            show-cancel-button="focus"
            placeholder="Search products..."
            v-model="searchQuery"
            @keydown="handleKeyPress"
        />

        <SearchResultsModal :isOpen="isModalOpen" :results="searchResults" @close="closeModal" @add="addItem"/>

        <div v-for="item in items" :key="item.id" class="w-full">
          <ItemCard :item="item" @click="openDetailModal(item)" @longpress="showDeleteActionSheet" @update-count="handleUpdateItemCount" />
        </div>
      </div>

      <ion-action-sheet
          :is-open="showActionSheet"
          @didDismiss="showActionSheet = false"
          :buttons="[
          {
            text: 'Delete Item',
            role: 'destructive',
            icon: trash,
            handler: handleDeleteItem
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]"
      ></ion-action-sheet>

      <SheetComponent ref="sheetComponentRef" :product="selectedProduct" />
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-searchbar.custom {
  --background: #fff;
  --color: #000;
  --placeholder-color: #000;
  --icon-color: #000;
  --clear-button-color: #000;
  --border-width: 2px;
  --border-radius: 24px;
}

.product-image {
  width: 100px;
  height: auto;
  max-height: 100px;
  object-fit: cover;
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonContent, IonPage, IonSearchbar, IonActionSheet, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import ItemCard from '@/components/ItemCard.vue';
import SheetComponent from '@/components/SheetComponent.vue';
import SearchResultsModal from '@/components/SearchResultComponent.vue';
import { fetchItems, addItemToGroup, updateItemCount, deleteItem } from '@/services/itemService';
import { getCurrentUser } from '@/services/authService';
import { searchProducts, fetchProductDetails } from '@/services/openFoodFactsService';
import {trash, camera, add} from "ionicons/icons";
import type { Item } from '@/models/myItem';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {BarcodeScanner} from "@capacitor-mlkit/barcode-scanning";
import ManualAddModal from "@/components/ManualAddModal.vue";

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
const openedByScan = ref(false);
const manualAddModalOpen = ref(false);

const openManualAddModal = () => {
  manualAddModalOpen.value = true;
};

const closeManualAddModal = () => {
  manualAddModalOpen.value = false;
};

const handleNewItem = (newItem) => {
  items.value.push(newItem); // Update the item list
};

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

let currentSearchRequestToken = null;

const handleKeyPress = async (event) => {
  if (event.key === 'Enter' && searchQuery.value.trim()) {
    const searchToken = Symbol();
    currentSearchRequestToken = searchToken;
    console.log('Current Search Query before API call:', searchQuery.value);
    try {
      const results = await searchProducts(searchQuery.value.trim());
      if (currentSearchRequestToken === searchToken) {
        searchResults.value = results;
        isModalOpen.value = true;
        console.log('Updated Search Results:', searchResults.value);
        console.log('Current Search Query after API call:', searchQuery.value);
      }
    } catch (error) {
      if (currentSearchRequestToken === searchToken) {
        console.error('Error searching products:', error);
      }
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
      productVolume: item.product_volume || 'N/A',
      selectedUserUUID: user.uid
    });
    items.value.push(newItem);
    isModalOpen.value = false;
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

const startScan = async () => {
  document.body.classList.add('barcode-scanner-active');
  try {
    const result = await BarcodeScanner.scan();
    console.log('Complete scan result:', JSON.stringify(result, null, 2));

    if (result.barcodes && result.barcodes.length > 0) {
      const barcode = result.barcodes[0].rawValue;
      console.log('Scanned barcode:', barcode);

      const productDetails = await fetchProductDetails(barcode);
      if (productDetails) {
        selectedProduct.value = { ...productDetails, barcode };
        openedByScan.value = true;
        sheetComponentRef.value.openModal();
      } else {
        console.log('Product details not found for barcode:', barcode);
      }
    } else {
      console.log('No valid barcode detected.');
    }
  } catch (error) {
    console.error('Scanning failed:', error);
  } finally {
    document.body.classList.remove('barcode-scanner-active');
  }
};

const checkAndStartScan = async () => {
  const status = await BarcodeScanner.checkPermissions();
  if (status.camera !== 'granted') {
    const requestStatus = await BarcodeScanner.requestPermissions();
    if (requestStatus.camera !== 'granted') {
      console.error('Camera permission is not granted');
      return;
    }
  }
  await startScan();
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

        <SearchResultsModal :isOpen="isModalOpen" :results="searchResults" :searchQuery="searchQuery" @close="closeModal" @add="addItem"/>

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

      <ion-fab vertical="bottom" horizontal="end" slot="fixed" style="bottom: 80px; right: 16px;">
        <ion-fab-button @click="openManualAddModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed" style="bottom: 16px; right: 16px;">
        <ion-fab-button @click="checkAndStartScan">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ManualAddModal :is-open="manualAddModalOpen" @itemAdded="handleNewItem" @close="closeManualAddModal" />
      <SheetComponent ref="sheetComponentRef" :product="selectedProduct" :add-item="addItem" :openedByScan="openedByScan" @close="openedByScan = false" />
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

body.barcode-scanner-active *:not(.barcode-scanner-modal) {
  display: none;
}
</style>

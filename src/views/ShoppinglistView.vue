<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonContent, IonPage, IonSearchbar } from '@ionic/vue';
import ItemCard from '@/compontents/ItemCard.vue';
import SheetComponent from '@/compontents/SheetComponent.vue';
import SearchResultsModal from '@/compontents/SearchResultComponent.vue';
import { searchProducts } from '@/services/openFoodFactsService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/../firebaseConfig';

const route = useRoute();
const groupId = route.params.groupId;
const groupData = ref(null);
const searchQuery = ref('');
const searchResults = ref([]);
const isModalOpen = ref(false);

const fetchGroupData = async () => {
  console.log('Fetching group data for groupId:', groupId); // Debug log
  try {
    const docRef = doc(db, 'groups', groupId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Group data:', docSnap.data()); // Debug log
      groupData.value = docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error('Error fetching group data:', error);
  }
};

const performSearch = async () => {
  if (searchQuery.value.trim() === '') {
    searchResults.value = [];
    isModalOpen.value = false;
    return;
  }

  try {
    const data = await searchProducts(searchQuery.value);
    searchResults.value = data;
    isModalOpen.value = true;
  } catch (error) {
    console.error('Error searching products:', error);
  }
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
};

const modalRef = ref(null);

const openModal = () => {
  if (modalRef.value) {
    modalRef.value.openModal();
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(fetchGroupData);
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="w-full h-full px-4 bg-white flex flex-col items-center">
        <h1 class="text-black text-[32px] py-10">{{ groupData ? groupData.groupName : 'Loading...' }}</h1>
        <ion-searchbar
            class="custom w-full my-4 text-black"
            show-cancel-button="focus"
            placeholder="Search products..."
            v-model="searchQuery"
            @keydown="handleKeyPress"
        />

        <SearchResultsModal :isOpen="isModalOpen" :results="searchResults" @close="closeModal"/>

        <button @click="openModal" class="w-full"><ItemCard/></button>
        <ItemCard/>
      </div>

      <SheetComponent ref="modalRef" />
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
  width: 100px; /* Adjust as needed */
  height: auto;
  max-height: 100px; /* Adjust as needed */
  object-fit: cover;
}
</style>

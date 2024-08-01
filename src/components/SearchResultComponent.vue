<script setup lang="ts">
import { ref, watch } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonList, IonItem, IonImg, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import { defineProps, defineEmits } from 'vue';
import { searchProducts } from '@/services/openFoodFactsService';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  searchQuery: String
});


const emit = defineEmits(['close', 'add']);
const results = ref([]);
const page = ref(1);
const isBusy = ref(false);
const hasMore = ref(true);

const closeModal = () => {
  emit('close');
};

const addItem = (item) => {
  emit('add', item);
};

const fetchResults = async () => {
  if (!props.searchQuery) return; // Guard against empty query
  isBusy.value = true;
  try {
    const newProducts = await searchProducts(props.searchQuery, page.value);
    if (newProducts.length === 0) {
      hasMore.value = false;
    } else {
      results.value = [...results.value, ...newProducts];
      page.value++;
    }
  } catch (error) {
    console.error('Error while fetching more products:', error);
  }
  isBusy.value = false;
};

const loadMore = async ($event) => {
  if (!isBusy.value && hasMore.value) {
    await fetchResults();
    $event.target.complete();
  } else {
    $event.target.complete();
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    results.value = []; // Reset results but not query
    page.value = 1;
    hasMore.value = true;
    fetchResults(); // Initial fetch
  }
});

</script>

<template>
  <ion-modal :is-open="isOpen" @didDismiss="closeModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Search Results</ion-title>
        <ion-button slot="end" @click="closeModal">Close</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="product in results" :key="product.code">
          <div class="flex flex-row items-center justify-between w-full">
            <div class="flex flex-col">
              <h2>{{ product.product_name }}</h2>
              <p>{{ product.brands }}</p>
            </div>
            <div class="flex flex-row items-center">
            <div class="flex-shrink-0">
              <ion-img :src="product.image_url" alt="item" class="product-image"/>
            </div>
            <ion-button @click="addItem(product)">Add</ion-button>
          </div>
          </div>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll threshold="100px" @ionInfinite="loadMore">
        <ion-infinite-scroll-content
            loading-spinner="bubbles"
            loading-text="Loading more products...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.product-image {
  width: 100px;
  height: auto;
  max-height: 100px;
  object-fit: cover;
}
</style>

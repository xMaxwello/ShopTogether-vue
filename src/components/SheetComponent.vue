<script setup lang="ts">
import { ref, watch } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue';
import { defineExpose, defineProps } from 'vue';
import { fetchProductDetails } from '@/services/openFoodFactsService';

const props = defineProps({
  product: {
    type: Object,
    required: false,
    default: () => ({})
  },
  addItem: Function,
  openedByScan: Boolean
});

const emit = defineEmits(['close']);

const isModalOpen = ref(false);
const productDetails = ref(null);

const openModal = () => {
  isModalOpen.value = true;
  fetchDetails(props.product.barcode);
};

const closeModal = () => {
  isModalOpen.value = false;
  emit('close');
};

const fetchDetails = async (barcode) => {
  try {
    productDetails.value = await fetchProductDetails(barcode);
  } catch (error) {
    console.error('Failed to fetch product details:', error);
  }
};

const handleAddItem = () => {
  props.addItem(props.product);
  closeModal(); // Close modal after adding the item
};

watch(() => props.product, (newVal) => {
  if (newVal.barcode) {
    fetchDetails(newVal.barcode);
  }
});

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ productDetails?.product_name || 'Item Name' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="px-4">
        <div class="flex flex-col items-center">
          <h1 class="text-4xl py-4">{{ productDetails?.product_name || 'Item Name' }}</h1>
          <img class="pb-4" :src="productDetails?.image_url || '../assets/img-placeholder.svg'" alt="image">
        </div>
        <ion-button v-if="props.addItem && props.openedByScan" @click="handleAddItem">Add to List</ion-button>
        <div class="flex flex-col pb-4">
          <span>Category: {{ productDetails?.categories || 'Category' }}</span>
        </div>
        <div class="justify-center px-16 pb-4">
<!--          <img :src="productDetails?.nutrition_grades_tags ? `../assets/nutri_score/Nutri-score-${productDetails.nutrition_grades_tags[0]}.png` : '../assets/nutri_score/Nutri-score-placeholder.png`" alt="Nutri"/>-->
        </div>
        <div class="flex flex-col pb-4">
          <div class="flex justify-center text-3xl">
            <span>Zutaten</span>
          </div>
          <span>{{ productDetails?.ingredients_text || 'Lorem ipsum dolor sit amet...' }}</span>
        </div>

        <div class="pb-8">
          <div class="flex justify-between">
            <span>Nährwertangaben</span>
            <span>Pro 100g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Energie</span>
            <span>{{ productDetails?.nutriments?.energy_kcal_100g || 'N/A' }} kcal</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Fett</span>
            <span>{{ productDetails?.nutriments?.fat_100g || 'N/A' }} g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Gesättigte Fettsäuren</span>
            <span>{{ productDetails?.nutriments?.saturated_fat_100g || 'N/A' }} g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Kohlenhydrate</span>
            <span>{{ productDetails?.nutriments?.carbohydrates_100g || 'N/A' }} g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Zucker</span>
            <span>{{ productDetails?.nutriments?.sugars_100g || 'N/A' }} g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Eiweiß</span>
            <span>{{ productDetails?.nutriments?.proteins_100g || 'N/A' }} g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Salz</span>
            <span>{{ productDetails?.nutriments?.salt_100g || 'N/A' }} g</span>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue';
import { defineExpose, defineProps } from 'vue';
import { fetchProductDetails } from '@/services/openFoodFactsService';
import ManualAddModal from '@/components/ManualAddModal.vue';

const props = defineProps({
  product: {
    type: Object,
    required: false,
    default: () => ({})
  },
  addItem: Function,
  openedByScan: Boolean
});

const emit = defineEmits(['close', 'editItem']);

const isModalOpen = ref(false);
const productDetails = ref(null);

const openModal = async () => {
  // Clear previous details
  productDetails.value = null;

  if (!props.product) {
    console.error("Product data is not available");
    return;
  }

  if (props.product.barcode) {
    try {
      productDetails.value = await fetchProductDetails(props.product.barcode);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  } else {
    productDetails.value = {
      product_name: props.product.productName,
      product_volume: props.product.productVolume,
      product_description: props.product.productDescription,
    };
  }

  await nextTick(); // Ensure Vue updates the DOM before opening the modal
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  emit('close');
};

const openEditModal = () => {
  emit('editItem', props.product);
};

// Watch for changes in the product and refresh details
watch(() => props.product, async (newProduct, oldProduct) => {
  if (newProduct && newProduct !== oldProduct) {
    productDetails.value = null; // Clear previous details immediately
    await openModal(); // Fetch and show the new product details
  }
});

const isManualAddModalOpen = ref(false);
const currentEditingItem = ref(null);

const openManualAddModal = (item) => {
  currentEditingItem.value = item;
  isManualAddModalOpen.value = true;
};

const closeManualAddModal = () => {
  isManualAddModalOpen.value = false;
  currentEditingItem.value = null;
};

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
      <div v-if="props.product.barcode">
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
      </div>
      <div v-else class="flex flex-col items-center">
        <span class="text-4xl py-4"> {{ productDetails?.product_name }} </span>
        <span class="text-xl">Inhalt:</span>
        <span>{{ productDetails?.product_volume }}</span>
        <span class="text-xl pt-4">Beschreibung</span>
        <span>{{ productDetails?.product_description }}</span>
        <button @click="openManualAddModal(props.product)" class="bg-confirmButton text-white rounded-[24px] w-[161px] h-[35px] mt-8">
          <span>Bearbeiten</span>
        </button>
      </div>

      <ManualAddModal
          :isOpen="isManualAddModalOpen"
          :item="currentEditingItem"
          @close="closeManualAddModal"
      />
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

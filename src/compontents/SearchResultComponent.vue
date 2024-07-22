<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { IonModal, IonContent, IonList, IonItem, IonLabel, IonImg, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  results: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
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
            <div class="flex-shrink-0">
              <ion-img :src="product.image_url" alt="item" class="product-image"/>
            </div>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<style scoped>
.product-image {
  width: 100px; /* Adjust as needed */
  height: auto;
  max-height: 100px; /* Adjust as needed */
  object-fit: cover;
}
</style>

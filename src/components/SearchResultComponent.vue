<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonList, IonItem, IonImg } from '@ionic/vue';

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

const emit = defineEmits(['close', 'add']);

const closeModal = () => {
  emit('close');
};

const addItem = (item) => {
  emit('add', item);
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
            <ion-button @click="addItem(product)">Add</ion-button>
          </div>
        </ion-item>
      </ion-list>
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

<script setup lang="ts">
import { ref } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel } from '@ionic/vue';
import { addItemToGroup } from '@/services/itemService';
import {useRoute} from "vue-router";
import {getCurrentUser} from "@/services/authService";

const isOpen = ref(false);
const route = useRoute();
const groupId = ref(route.params.groupId);
const emit = defineEmits(['itemAdded', 'close']);

const productName = ref('');
const productDescription = ref('');
const productVolume = ref('');

const closeModal = () => {
  isOpen.value = false;
  emit('close');
};

const saveProduct = async () => {
  const user = await getCurrentUser();
  const itemData = {
    productName: productName.value,
    productDescription: productDescription.value,
    productVolume: productVolume.value || 'N/A',
    productCount: 1,
    productImageUrl: '',
    selectedUserUUID: user.uid,
  };

  try {
    const newItem = await addItemToGroup(groupId.value, itemData);
    closeModal();
    productName.value = '';
    productDescription.value = '';
    productVolume.value = '';
    // Emit event or call method to update the parent component's item list
    emit('itemAdded', newItem); // Example: emitting an event that the parent listens to
  } catch (error) {
    console.error('Failed to save product:', error);
  } finally {
    closeModal();  // Ensure modal closes even if there is an error
  }
};

</script>

<template>
  <ion-modal :is-open="isOpen" @didDismiss="closeModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Product</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Product Name</ion-label>
        <ion-input v-model="productName" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Product Description</ion-label>
        <ion-input v-model="productDescription" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Product Volume</ion-label>
        <ion-input v-model="productVolume" type="text"></ion-input>
      </ion-item>
      <ion-button expand="block" @click="saveProduct">Save Product</ion-button>
    </ion-content>
  </ion-modal>
</template>

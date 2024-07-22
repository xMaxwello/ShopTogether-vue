<script setup lang="ts">
import { ref } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/vue';
import { defineExpose } from 'vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
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
        <ion-title>Item Name</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="px-4">

      <div class="flex flex-col items-center">
        <h1 class="text-4xl py-4">Item Name</h1>
        <img class="pb-4" src="../assets/img-placeholder.svg" alt="image">
      </div>

      <div class="flex flex-col pb-4">
        <span>Category</span>
        <span>Category</span>
        <span>Category</span>
        <span>Category</span>
        <span>Category</span>
      </div>

        <div class="justify-center px-16 pb-4">
          <img src="../assets/nutri_score/Nutri-score-a.png" alt="Nutri">
        </div>

        <div class="flex flex-col pb-4">
          <div class="flex justify-center text-3xl">
            <span>Zutaten</span>
          </div>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius lorem non urna tempus, ac hendrerit velit dapibus. Suspendisse nec cursus dolor, a facilisis massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam semper aliquet lacus, a semper risus hendrerit id. Maecenas bibendum mollis tortor in pharetra. Maecenas porta arcu vel metus porta finibus. Praesent faucibus consectetur neque ac volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam maximus venenatis leo finibus sagittis.
          </span>
        </div>

        <div class="pb-8">
          <div class="flex justify-between">
            <span>Nährwertangaben</span>
            <span>Pro 100g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Energie</span>
            <span>522 kcal</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Fett</span>
            <span>28.8 g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Gesättigte Fettsäuren</span>
            <span>12.7 g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Kohlenhydrate</span>
            <span>59 g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Zucker</span>
            <span>48.9 g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Eiweiß</span>
            <span>6 g</span>
          </div>
          <hr class="my-2">
          <div class="flex justify-between">
            <span>Salz</span>
            <span>0.3 g</span>
          </div>
        </div>

      </div>
    </ion-content>
  </ion-modal>
</template>

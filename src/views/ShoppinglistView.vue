<script setup lang="ts">
import { ref } from 'vue';
import { IonContent, IonPage, IonSearchbar } from '@ionic/vue';
import ItemCard from '@/compontents/ItemCard.vue';
import SheetComponent from '@/compontents/SheetComponent.vue';

const modalRef = ref(null);

const openModal = () => {
  if (modalRef.value) {
    modalRef.value.openModal();
  }
};
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="w-full h-full px-4 bg-white flex flex-col items-center">
        <ion-searchbar class="custom w-full my-4 text-black" show-cancel-button="focus" placeholder="Search..."/>
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
</style>

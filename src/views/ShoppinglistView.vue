<script setup lang="ts">
import {IonContent, IonPage} from "@ionic/vue";
import ItemCard from "@/compontents/ItemCard.vue";

const openBottomSheet = () => {

}
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="w-full h-full px-4 bg-white flex flex-col items-center">
        <ion-searchbar class="custom w-full my-4 text-black" show-cancel-button="focus" placeholder="Search..."/>
        <button @click="openBottomSheet" class="w-full"><ItemCard/></button>
        <ItemCard/>

      </div>

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
<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import GroupCard from "@/compontents/GroupCard.vue";
import router from "@/router";


const goToList = () => {
  router.push('/shoppinglist')
}
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="w-full h-full px-4 bg-white flex flex-col items-center">
        <h1 class="text-black text-[32px] py-10">Gruppen</h1>
        <button @click="goToList" class="w-full"><GroupCard/></button>
        <GroupCard/>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonIcon } from '@ionic/vue';
import GroupCard from "@/compontents/GroupCard.vue";
import router from "@/router";
import {add} from "ionicons/icons";


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

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

    </ion-content>
  </ion-page>
</template>

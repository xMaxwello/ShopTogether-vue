<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import LoginCard from "@/components/loginCard.vue";
</script>



<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="flex w-full h-full flex-col items-center pt-24 bg-white">
        <span class="text-[40px] text-black">ShopTogether</span>

        <LoginCard/>

      </div>
    </ion-content>
  </ion-page>
</template>


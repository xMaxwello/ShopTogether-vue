<script setup lang="ts">

import {IonContent, IonPage} from "@ionic/vue";
import AccountCard from "@/compontents/AccountCard.vue";
import router from "@/router";


const goToAccount = () => {
  router.push('/account')
}
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="w-full h-full px-4 bg-white flex flex-col items-center">
        <h1 class="text-black text-[32px] py-10">Einstellungen</h1>

        <button @click="goToAccount" class="w-full">
        <AccountCard/>
        </button>


        <div class="flex flex-col w-full justify-between text-gray-700">
        <ion-toggle class="py-8">Push-Benachrichtigung erlauben</ion-toggle>
        <ion-toggle class="pb-8">Vibration beim Scannen</ion-toggle>
        <ion-toggle class="pb-8">In-App Töne</ion-toggle>
        <ion-toggle class="pb-16">Dark Theme</ion-toggle>
        </div>

        <button class="bg-confirmButton text-white rounded-[24px] w-[180px] h-[43px] mb-2">Abmelden</button>


      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import {IonContent, IonPage} from "@ionic/vue";
import AccountCard from "@/compontents/AccountCard.vue";
import router from "@/router";
import {logoutUser} from "@/services/authService";
import {ref} from "vue";

const toastMessage = ref('');


const goToAccount = () => {
  router.push('/account')
}


const handleLogout = async () => {
  try {
    await logoutUser();
    toastMessage.value = 'Successfully logged out!';
    await router.push('/login');
  } catch (error) {
    toastMessage.value = error.message;
  }
};
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

        <button @click="handleLogout" class="bg-confirmButton text-white rounded-[24px] w-[180px] h-[43px] mb-2">Abmelden</button>


      </div>

    </ion-content>
  </ion-page>
</template>

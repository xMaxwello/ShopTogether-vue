<script setup lang="ts">
import {IonContent, IonPage} from "@ionic/vue";
import router from "@/router";

const goToSettings = () => {
  router.push('/settings');
};
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="w-full h-full px-4 bg-white flex flex-col items-center">
        <h1 class="text-black text-[32px] pt-10 pb-6">Accounteinstellungen</h1>


        <div class="flex flex-col w-full justify-between text-gray-700">
          <button class=" text-white rounded-[24px] w-full h-[43px] my-8 flex flex-row items-center justify-between">
            <span class="text-gray-600">Name ändern</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 0L11.25 2.25L15.75 6.75L18 4.5L13.5 0ZM9 4.5L0 13.5V18H4.5L13.5 9L9 4.5Z" fill="#757575"/>
            </svg>
          </button>
          <button class=" text-white rounded-[24px] w-full h-[43px] mb-8 flex flex-row items-center justify-between">
            <span class="text-gray-600">E-Mail ändern</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 0L11.25 2.25L15.75 6.75L18 4.5L13.5 0ZM9 4.5L0 13.5V18H4.5L13.5 9L9 4.5Z" fill="#757575"/>
            </svg>
          </button>
          <button class=" text-white rounded-[24px] w-full h-[43px] mb-8 flex flex-row items-center justify-between">
            <span class="text-gray-600">Passwort ändern</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 0L11.25 2.25L15.75 6.75L18 4.5L13.5 0ZM9 4.5L0 13.5V18H4.5L13.5 9L9 4.5Z" fill="#757575"/>
            </svg>
          </button>
          <button class=" text-white rounded-[24px] w-full h-[43px] mb-16 flex flex-row items-center justify-between">
            <span class="text-red-600">Account löschen</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 9V18.4C17 18.7314 16.7314 19 16.4 19H3.6C3.26863 19 3 18.7314 3 18.4V9" stroke="#F4473B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 15V9" stroke="#F4473B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15V9" stroke="#F4473B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 5H14M14 5V1.6C14 1.26863 13.7314 1 13.4 1H6.6C6.26863 1 6 1.26863 6 1.6V5M14 5H6M1 5H6" stroke="#F4473B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <button @click="goToSettings" class="bg-confirmButton text-white rounded-[24px] w-[180px] h-[43px] mb-2">Zurück</button>


      </div>

    </ion-content>
  </ion-page>
</template>
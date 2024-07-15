<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
</script>



<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="flex w-full h-full flex-col items-center pt-24 bg-white">
        <span class="text-[40px] text-black">ShopTogether</span>

        <div class="flex flex-col w-[321px] h-auto py-4 bg-loginCard rounded-2xl items-center px-8 mt-24">
          <span class="text-black text-[24px]">Anmeldung</span>
          <ion-input label="E-Mail" label-placement="floating" type="text" class="text-gray-500 mb-2"/>
          <ion-input label="Passwort" label-placement="floating" type="password" class="text-gray-500 mb-2"/>

          <div class="flex flex-col">
            <button class="bg-confirmButton text-white rounded-[24px] w-[161px] h-[35px] mb-2">Anmelden</button>
            <button class="bg-white text-confirmButton rounded-[24px] w-[161px] h-[35px]">Registrieren</button>
          </div>

        </div>

      </div>
    </ion-content>
  </ion-page>
</template>


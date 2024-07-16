<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {personOutline, settingsOutline,} from 'ionicons/icons';
</script>

<template>
  <ion-page class="bg-white">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom" class="rounded-t-[20px] grid grid-cols-4" style="--background: #D3D8F7; --color: #000000;">

        <ion-tab-button tab="home" href="/home">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="settings" href="/settings">
          <ion-icon aria-hidden="true" :icon="settingsOutline" />
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>

    </ion-tabs>
  </ion-page>
</template>

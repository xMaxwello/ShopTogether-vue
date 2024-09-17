<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import router from "@/router";


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    router.push('/home');
  } else {
    router.push('/login');
  }
});

</script>


<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

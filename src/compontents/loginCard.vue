<script setup lang="ts">
import { ref } from 'vue';

const isLoginView = ref(true);

const toggleView = () => {
  isLoginView.value = !isLoginView.value;
};
</script>

<template>
  <div class="flex flex-col w-[321px] h-auto py-4 bg-loginCard rounded-2xl items-center px-8 mt-24">
    <span class="text-black text-[24px]">{{ isLoginView ? 'Anmeldung' : 'Registrieren' }}</span>

    <ion-input
        v-if="!isLoginView"
        label="Vorname"
        label-placement="floating"
        type="text"
        class="text-gray-500 mb-2"
    />
    <ion-input
        v-if="!isLoginView"
        label="Nachname"
        label-placement="floating"
        type="text"
        class="text-gray-500 mb-2"
    />

    <ion-input
        label="E-Mail"
        label-placement="floating"
        type="text"
        class="text-gray-500 mb-2"
    />

    <ion-input
        label="Passwort"
        label-placement="floating"
        type="password"
        class="text-gray-500 mb-2"
    />

    <ion-input
        v-if="!isLoginView"
        label="Passwort wiederholen"
        label-placement="floating"
        type="password"
        class="text-gray-500 mb-2"
    />

    <div class="flex flex-col">
      <button v-if="isLoginView" class="bg-confirmButton text-white rounded-[24px] w-[161px] h-[35px] mb-2">
        Anmelden
      </button>
      <button v-else class="bg-confirmButton text-white rounded-[24px] w-[161px] h-[35px] mb-2">
        Registrieren
      </button>
      <button @click="toggleView" class="bg-white text-confirmButton rounded-[24px] w-[161px] h-[35px]">
        {{ isLoginView ? 'Zur Registrierung' : 'Zur Anmeldung' }}
      </button>
    </div>
  </div>
</template>


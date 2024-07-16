<script lang="ts" setup>

</script>

<template>
  <div class="w-[375px] rounded-3xl z-10 h-auto bg-loginCard">
    <div class="p-6">
      <h1 class="text-black text-xl">Name ändern</h1>
      <ion-input
          label="Vorname"
          label-placement="floating"
          type="text"
          class="text-gray-500 mb-2"
      />
      <ion-input
          label="Nachname"
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
      <div class="flex flex-row justify-between">
        <button class="bg-confirmButton text-white w-[140px] h-[43px] rounded-md">
          <span>Abbrechen</span>
        </button>
        <button class="bg-confirmButton text-white w-[140px] h-[43px] rounded-md">
          <span>Bestätigen</span>
        </button>
      </div>
    </div>
  </div>
</template>

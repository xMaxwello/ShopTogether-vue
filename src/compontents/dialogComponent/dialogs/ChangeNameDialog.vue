<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { updateUserProfile } from '@/services/userService';
import { getAuth } from 'firebase/auth';

const emit = defineEmits(['close']);
const auth = getAuth();
const uid = auth.currentUser ? auth.currentUser.uid : null;

const firstName = ref('');
const lastName = ref('');

const handleFirstNameInput = (event) => {
  firstName.value = event.target.value;
  console.log('First Name Input:', firstName.value);
};

const handleLastNameInput = (event) => {
  lastName.value = event.target.value;
  console.log('Last Name Input:', lastName.value);
};

const confirmChange = async () => {
  try {
    console.log('UID:', uid);
    console.log('First Name:', firstName.value);
    console.log('Last Name:', lastName.value);

    if (!firstName.value || !lastName.value) {
      throw new Error('Both first name and last name must be provided');
    }
    await updateUserProfile(uid, firstName.value, lastName.value);
    console.log('Profile updated successfully');
    emit('close');
  } catch (error) {
    console.error(error.message);
  }
};

const closeDialog = () => {
  emit('close');
};
</script>

<template>
  <div class="dialog-card fixed inset-0 flex items-center justify-center z-50">
    <div class="w-[375px] rounded-3xl h-auto bg-loginCard shadow-lg">
      <div class="p-6">
        <h1 class="text-black text-xl mb-4">Name ändern</h1>
        <ion-input
            :value="firstName"
            @ionInput="handleFirstNameInput"
            label="Vorname"
            label-placement="floating"
            type="text"
            class="text-gray-500 mb-4"
        />
        <ion-input
            :value="lastName"
            @ionInput="handleLastNameInput"
            label="Nachname"
            label-placement="floating"
            type="text"
            class="text-gray-500 mb-4"
        />
        <div class="flex flex-row justify-between">
          <button @click="closeDialog" class="bg-confirmButton text-white w-[140px] h-[43px] rounded-md">
            <span>Abbrechen</span>
          </button>
          <button @click="confirmChange" class="bg-confirmButton text-white w-[140px] h-[43px] rounded-md">
            <span>Bestätigen</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-card {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

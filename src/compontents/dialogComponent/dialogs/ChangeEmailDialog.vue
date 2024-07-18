<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { reauthenticateUser, updateUserEmail } from '@/services/userService';
import { getAuth } from 'firebase/auth';

const emit = defineEmits(['close']);
const auth = getAuth();
const currentEmail = auth.currentUser ? auth.currentUser.email : '';

const newEmail = ref('');
const currentPassword = ref('');

const handleNewEmailInput = (event) => {
  newEmail.value = event.target.value;
  console.log('New Email Input:', newEmail.value);
};

const handleCurrentPasswordInput = (event) => {
  currentPassword.value = event.target.value;
  console.log('Current Password Input:', currentPassword.value);
};

const confirmChange = async () => {
  try {
    console.log('Current Email:', currentEmail);
    console.log('New Email:', newEmail.value);
    console.log('Current Password:', currentPassword.value);

    if (!newEmail.value || !currentPassword.value) {
      throw new Error('Both new email and current password must be provided');
    }
    await reauthenticateUser(currentEmail, currentPassword.value);
    await updateUserEmail(newEmail.value);
    console.log('Email updated successfully');
    emit('close');
  } catch (error) {
    console.error(error.message);
    alert(error.message);
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
        <h1 class="text-black text-xl mb-4">E-Mail ändern</h1>
        <ion-input
            :value="newEmail"
            @ionInput="handleNewEmailInput"
            label="Neue E-Mail"
            label-placement="floating"
            type="email"
            class="text-gray-500 mb-4"
        />
        <ion-input
            :value="currentPassword"
            @ionInput="handleCurrentPasswordInput"
            label="Passwort"
            label-placement="floating"
            type="password"
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

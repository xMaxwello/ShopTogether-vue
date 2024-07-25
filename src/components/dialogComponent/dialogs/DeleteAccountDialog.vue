<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { reauthenticateUser, deleteUserAccount } from '@/services/userService';
import { getAuth } from 'firebase/auth';

const emit = defineEmits(['close']);
const auth = getAuth();
const currentEmail = auth.currentUser ? auth.currentUser.email : '';

const currentPassword = ref('');

const handleCurrentPasswordInput = (event) => {
  currentPassword.value = event.target.value;
  console.log('Current Password Input:', currentPassword.value);
};

const confirmDeletion = async () => {
  try {
    console.log('Current Email:', currentEmail);
    console.log('Current Password:', currentPassword.value);

    if (!currentPassword.value) {
      throw new Error('Password must be provided');
    }
    await reauthenticateUser(currentEmail, currentPassword.value);
    await deleteUserAccount(currentEmail, currentPassword.value);
    console.log('Account deleted successfully');
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
        <h1 class="text-black text-xl mb-4">Account löschen</h1>
        <p class="text-red-600 mb-4">Bist du sicher, dass du deinen Account löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.</p>
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
          <button @click="confirmDeletion" class="bg-confirmButton text-white w-[140px] h-[43px] rounded-md">
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

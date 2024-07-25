<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { reauthenticateUser, updateUserPassword } from '@/services/userService';
import { getAuth } from 'firebase/auth';

const emit = defineEmits(['close']);
const auth = getAuth();
const currentEmail = auth.currentUser ? auth.currentUser.email : '';

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const handleCurrentPasswordInput = (event) => {
  currentPassword.value = event.target.value;
  console.log('Current Password Input:', currentPassword.value);
};

const handleNewPasswordInput = (event) => {
  newPassword.value = event.target.value;
  console.log('New Password Input:', newPassword.value);
};

const handleConfirmNewPasswordInput = (event) => {
  confirmNewPassword.value = event.target.value;
  console.log('Confirm New Password Input:', confirmNewPassword.value);
};

const confirmChange = async () => {
  try {
    console.log('Current Email:', currentEmail);
    console.log('Current Password:', currentPassword.value);
    console.log('New Password:', newPassword.value);
    console.log('Confirm New Password:', confirmNewPassword.value);

    if (!currentPassword.value || !newPassword.value || !confirmNewPassword.value) {
      throw new Error('All fields must be provided');
    }

    if (newPassword.value !== confirmNewPassword.value) {
      throw new Error('New password and confirm new password do not match');
    }
    await reauthenticateUser(currentEmail, currentPassword.value);
    await updateUserPassword(currentEmail, currentPassword.value, newPassword.value);
    console.log('Password updated successfully');
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
        <h1 class="text-black text-xl mb-4">Passwort ändern</h1>
        <ion-input
            :value="currentPassword"
            @ionInput="handleCurrentPasswordInput"
            label="Aktuelles Passwort"
            label-placement="floating"
            type="password"
            class="text-gray-500 mb-4"
        />
        <ion-input
            :value="newPassword"
            @ionInput="handleNewPasswordInput"
            label="Neues Passwort"
            label-placement="floating"
            type="password"
            class="text-gray-500 mb-4"
        />
        <ion-input
            :value="confirmNewPassword"
            @ionInput="handleConfirmNewPasswordInput"
            label="Neues Passwort bestätigen"
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

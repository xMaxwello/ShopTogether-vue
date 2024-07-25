<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {loginUser, registerUser} from '@/services/authService';
import { IonInput, IonToast } from '@ionic/vue';

const user = ref(null);

const router = useRouter();
const isLoginView = ref(true);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const toastMessage = ref('');

const toggleView = () => {
  isLoginView.value = !isLoginView.value;
};

const handleRegister = async () => {
  if (!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
    toastMessage.value = 'All fields are required';
    return;
  }

  if (password.value !== confirmPassword.value) {
    toastMessage.value = 'Passwords do not match';
    return;
  }

  try {
    const userData = await registerUser(email.value, password.value, firstName.value, lastName.value);
    user.value = userData;
    toastMessage.value = 'Registration successful!';
    await router.push('/home');
  } catch (error) {
    toastMessage.value = error.message;
  }
};

const handleLogin = async () => {
  if (!email.value || !password.value) {
    toastMessage.value = 'All fields are required';
    return;
  }

  try {
    const userData = await loginUser(email.value, password.value);
    user.value = userData;
    toastMessage.value = 'Login successful!';
    router.push('/home');
  } catch (error) {
    toastMessage.value = error.message;
  }
};
</script>

<template>
  <div class="flex flex-col w-[321px] h-auto py-4 bg-loginCard rounded-2xl items-center px-8 mt-24">
    <span class="text-black text-[24px]">{{ isLoginView ? 'Anmeldung' : 'Registrieren' }}</span>

    <ion-input
        v-if="!isLoginView"
        v-model="firstName"
        label="Vorname"
        label-placement="floating"
        type="text"
        class="text-gray-500 mb-2"
    />
    <ion-input
        v-if="!isLoginView"
        v-model="lastName"
        label="Nachname"
        label-placement="floating"
        type="text"
        class="text-gray-500 mb-2"
    />

    <ion-input
        v-model="email"
        label="E-Mail"
        label-placement="floating"
        type="email"
        class="text-gray-500 mb-2"
    />

    <ion-input
        v-model="password"
        label="Passwort"
        label-placement="floating"
        type="password"
        class="text-gray-500 mb-2"
    />

    <ion-input
        v-if="!isLoginView"
        v-model="confirmPassword"
        label="Passwort wiederholen"
        label-placement="floating"
        type="password"
        class="text-gray-500 mb-2"
    />

    <div class="flex flex-col">
      <button v-if="isLoginView" @click="handleLogin" class="bg-confirmButton text-white rounded-[24px] w-[161px] h-[35px] mb-2">
        Anmelden
      </button>
      <button v-else @click="handleRegister" class="bg-confirmButton text-white rounded-[24px] w-[161px] h-[35px] mb-2">
        Registrieren
      </button>
      <button @click="toggleView" class="bg-white text-confirmButton rounded-[24px] w-[161px] h-[35px]">
        {{ isLoginView ? 'Zur Registrierung' : 'Zur Anmeldung' }}
      </button>
    </div>

    <ion-toast :is-open="toastMessage !== ''" @didDismiss="toastMessage = ''" :message="toastMessage" duration="2000"></ion-toast>
  </div>
</template>

<style scoped>
.bg-loginCard {
  background-color: #f3f3f3; /* Adjust as needed */
}
</style>

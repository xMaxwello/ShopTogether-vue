<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['close', 'createGroup']);
const groupName = ref('');

const handleGroupNameInput = (event) => {
  groupName.value = event.target.value;
};

const createGroup = () => {
  if (groupName.value.trim()) {
    emit('createGroup', groupName.value.trim());
  } else {
    alert('Group name cannot be empty');
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
        <h1 class="text-black text-xl mb-4">Neue Gruppe erstellen</h1>
        <ion-input
            :value="groupName"
            @ionInput="handleGroupNameInput"
            label="Gruppenname"
            label-placement="floating"
            type="text"
            class="text-gray-500 mb-4"
        />
        <div class="flex flex-row justify-between">
          <button @click="closeDialog" class="bg-confirmButton text-white w-[140px] h-[43px] rounded-md">
            <span>Abbrechen</span>
          </button>
          <button @click="createGroup" class="bg-confirmButton text-white w-[140px] h-[43px] rounded-md">
            <span>Erstellen</span>
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

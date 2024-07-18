<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import ChangeNameDialog from '@/compontents/dialogComponent/dialogs/ChangeNameDialog.vue';
import ChangeEmailDialog from '@/compontents/dialogComponent/dialogs/ChangeEmailDialog.vue';
import ChangePasswordDialog from '@/compontents/dialogComponent/dialogs/ChangePasswordDialog.vue';
import DeleteAccountDialog from '@/compontents/dialogComponent/dialogs/DeleteAccountDialog.vue';

const props = defineProps({
  actionType: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['close']);

const closeDialog = () => {
  emit('close');
};
</script>

<template>
  <div>
    <ChangeNameDialog v-if="actionType === 'name'" @close="closeDialog" />
    <ChangeEmailDialog v-if="actionType === 'email'" @close="closeDialog" />
    <ChangePasswordDialog v-if="actionType === 'password'" @close="closeDialog" />
    <DeleteAccountDialog v-if="actionType === 'delete'" @close="closeDialog" />
  </div>
</template>

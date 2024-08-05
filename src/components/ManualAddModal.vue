<script setup>
import { ref, watch, onMounted } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel } from '@ionic/vue';
import { updateItemInGroup, addItemToGroup } from '@/services/itemService';
import { getCurrentUser } from '@/services/authService';
import { useRoute } from "vue-router";

const props = defineProps({
  isOpen: Boolean,
  item: Object  // Expected to have id when editing
});

const isOpen = ref(props.isOpen);
const productName = ref('');
const productDescription = ref('');
const productVolume = ref('');
const groupId = ref(useRoute().params.groupId); // Assuming groupId is part of the route

watch(props, (newVal) => {
  isOpen.value = newVal.isOpen;
  if (newVal.item) {
    productName.value = newVal.item.productName || '';
    productDescription.value = newVal.item.productDescription || '';
    productVolume.value = newVal.item.productVolume || '';
  } else {
    productName.value = '';
    productDescription.value = '';
    productVolume.value = '';
  }
}, { deep: true });

const emit = defineEmits(['update', 'close']);

const closeModal = () => {
  isOpen.value = false;
  emit('close');
};

const saveOrUpdateProduct = async () => {
  const user = await getCurrentUser();
  const itemData = {
    id: props.item?.id,
    productName: productName.value,
    productDescription: productDescription.value,
    productVolume: productVolume.value,
    productCount: 1,
    productImageUrl: '',
    selectedUserUUID: user.uid,
  };

  try {
    if (itemData.id) {
      await updateItemInGroup(groupId.value, itemData);
    } else {
      await addItemToGroup(groupId.value, itemData);
    }
    emit('update', itemData);
    closeModal();
  } catch (error) {
    console.error('Failed to save or update product:', error);
  }
};

onMounted(() => {
  if (props.isOpen && props.item) {
    productName.value = props.item.productName;
    productDescription.value = props.item.productDescription;
    productVolume.value = props.item.productVolume;
  }
});
</script>



<template>
  <ion-modal :is-open="isOpen" @didDismiss="closeModal">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ props.item?.id ? 'Edit Product' : 'Add Product' }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating" class="mb-4">Product Name</ion-label>
        <ion-input v-model="productName" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating" class="mb-4">Product Volume</ion-label>
        <ion-input v-model="productVolume" type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating" class="mb-4">Product Description</ion-label>
        <ion-input v-model="productDescription" type="text"></ion-input>
      </ion-item>
      <div class="flex justify-center">
        <button @click="saveOrUpdateProduct" class="bg-confirmButton text-white rounded-[24px] w-[161px] h-[35px] mt-8">{{ props.item?.id ? 'Update Product' : 'Add Product' }}</button>
      </div>
    </ion-content>
  </ion-modal>
</template>
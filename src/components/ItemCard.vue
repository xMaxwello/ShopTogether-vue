<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['longpress', 'click', 'update-count']);

let pressTimer = null;
let isLongPress = false;

const startPress = (event) => {
  event.stopPropagation();
  isLongPress = false;
  pressTimer = setTimeout(() => {
    isLongPress = true;
    emit('longpress', props.item.id);
  }, 1000); // 1 second hold time for long press
};

const cancelPress = (event) => {
  event.stopPropagation();
  clearTimeout(pressTimer);
};

const handleClick = (event) => {
  event.stopPropagation();
  if (!isLongPress) {
    emit('click', props.item);
  }
};

const incrementCount = (event) => {
  event.stopPropagation();
  emit('update-count', { item: props.item, delta: 1 });
};

const decrementCount = (event) => {
  event.stopPropagation();
  emit('update-count', { item: props.item, delta: -1 });
};
</script>

<template>
  <div
      class="w-full h-[76px] bg-loginCard text-black rounded-r-[11px] border-l-8 border-blue-800 px-4 my-2 flex items-center justify-between"
      @mousedown="startPress"
      @touchstart="startPress"
      @mouseup="cancelPress"
      @mouseleave="cancelPress"
      @touchend="cancelPress"
      @click="handleClick"
  >
    <div class="flex flex-row items-center">
      <div class="flex items-center justify-center bg-white w-[45px] min-h-[45px] h-auto rounded-md mr-4">
        <img v-if="item.productImageUrl" :src="item.productImageUrl" alt="Product Image" class="w-[45px] h-[45px] rounded-md object-cover" />
        <img v-else src="../assets/img-placeholder.svg" alt="Placeholder" class="w-8 h-8"/>
      </div>
      <span class="text-[20px] leading-6 my-2">{{ item.productName }}</span>
    </div>
    <div class="flex flex-row">
      <div class="flex flex-row pr-4 items-center">
        <button @click="decrementCount">
          <svg width="17" height="60" viewBox="0 0 17 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H16" stroke="#424242" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <span class="pl-1 text-[20px] text-gray-700 mx-4">{{ item.productCount }}</span>
        <button @click="incrementCount">
          <svg width="17" height="60" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8.5H8.5M8.5 8.5H16M8.5 8.5V1M8.5 8.5V16" stroke="#424242" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-image {
  width: 45px;
  height: 45px;
  object-fit: cover;
}
</style>

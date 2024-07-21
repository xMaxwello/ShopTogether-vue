<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  groupName: {
    type: String,
    required: true
  },
  membersCount: {
    type: Number,
    required: false,
    default: 1
  },
  itemsCount: {
    type: Number,
    required: false,
    default: 0
  },
  groupId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['click', 'longpress']);

let pressTimer = null;

const startPress = () => {
  pressTimer = setTimeout(() => {
    emit('longpress', props.groupId);
  }, 1000); // 1 second hold time for long press
};

const cancelPress = () => {
  clearTimeout(pressTimer);
};

const handleClick = () => {
  emit('click', props.groupId);
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
    <div>
      <span class="text-[20px]">{{ groupName }}</span>
    </div>
    <div class="flex flex-row">
      <div class="flex flex-row pr-4 items-center">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.02 10.8633C13.809 10.8633 16.0825 8.37891 16.0825 5.35547C16.0825 2.35547 13.8207 0 11.02 0C8.24261 0 5.95746 2.40234 5.95746 5.37891C5.96918 8.39062 8.2309 10.8633 11.02 10.8633ZM11.02 9.09375C9.30902 9.09375 7.84418 7.45312 7.84418 5.37891C7.84418 3.33984 9.28558 1.76953 11.02 1.76953C12.7661 1.76953 14.1957 3.31641 14.1957 5.35547C14.1957 7.42969 12.7426 9.09375 11.02 9.09375ZM3.64886 21.7031H18.3793C20.3246 21.7031 21.2504 21.1172 21.2504 19.8281C21.2504 16.7578 17.3715 12.3164 11.02 12.3164C4.65668 12.3164 0.777771 16.7578 0.777771 19.8281C0.777771 21.1172 1.70355 21.7031 3.64886 21.7031ZM3.09808 19.9336C2.7934 19.9336 2.66449 19.8516 2.66449 19.6055C2.66449 17.6836 5.64105 14.0859 11.02 14.0859C16.3871 14.0859 19.3637 17.6836 19.3637 19.6055C19.3637 19.8516 19.2465 19.9336 18.9418 19.9336H3.09808Z" fill="#424242"/>
        </svg>
        <span class="pl-1 text-[20px] text-gray-700">{{ membersCount }}</span>
      </div>
      <div class="flex flex-row pr-4 items-center">
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.54254 18.2148H23.2183C23.6754 18.2148 24.0738 17.8398 24.0738 17.3359C24.0738 16.832 23.6754 16.457 23.2183 16.457H9.74176C9.07379 16.457 8.66364 15.9883 8.55817 15.2734L8.37067 14.043H23.2418C24.9527 14.043 25.8316 12.9883 26.0777 11.3125L27.0152 5.11328C27.0386 4.96094 27.0621 4.77344 27.0621 4.66797C27.0621 4.10547 26.6402 3.71875 25.9957 3.71875H6.85895L6.63629 2.23047C6.5191 1.32812 6.19098 0.871094 4.99567 0.871094H0.882385C0.413635 0.871094 0.0151978 1.28125 0.0151978 1.75C0.0151978 2.23047 0.413635 2.64062 0.882385 2.64062H4.84332L6.71832 15.5078C6.96442 17.1719 7.84332 18.2148 9.54254 18.2148ZM25.0699 5.48828L24.2379 11.1016C24.1441 11.8281 23.7574 12.2734 23.066 12.2734L8.11285 12.2852L7.11676 5.48828H25.0699ZM10.4683 23.9102C11.523 23.9102 12.3668 23.0781 12.3668 22.0117C12.3668 20.957 11.523 20.1133 10.4683 20.1133C9.40192 20.1133 8.55817 20.957 8.55817 22.0117C8.55817 23.0781 9.40192 23.9102 10.4683 23.9102ZM21.4254 23.9102C22.4918 23.9102 23.3355 23.0781 23.3355 22.0117C23.3355 20.957 22.4918 20.1133 21.4254 20.1133C20.3707 20.1133 19.5152 20.957 19.5152 22.0117C19.5152 23.0781 20.3707 23.9102 21.4254 23.9102Z" fill="#424242"/>
        </svg>
        <span class="pl-1 text-[20px] text-gray-700">{{ itemsCount }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-card {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

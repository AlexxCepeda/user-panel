<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    class="bg-green-500 shadow py-2 px-3 rounded-full flex items-center disabled:bg-gray-400"
  >
    <svg
      class="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <path
          d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
          stroke="#ffffff"
          stroke-width="1.392"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
          stroke="#ffffff"
          stroke-width="1.392"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["click"]);

const handleClick = (event) => {
  emit("click", event);
};
</script>

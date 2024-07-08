<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex flex-col items-center justify-center gap-4"
  >
    <div
      class="w-5/6 md:w-2/5 p-10 bg-white rounded-md shadow-lg flex flex-col"
      ref="dialog"
    >
      <div class="modal-header">
        <slot name="header">
          <h1 class="text-center text-3xl text-gray-500 mb-3">
            {{ title }}
          </h1>
          <h4 class="text-center text-xl text-gray-500">
            {{ description }}
          </h4>
        </slot>
      </div>
      <div>
        <slot name="content"> </slot>
      </div>
      <div>
        <slot name="footer">
          <div class="flex flex-col md:flex-row gap-2 md:w-2/3 mx-auto mt-4">
            <button
              @click.stop="emit('close')"
              class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded w-full"
            >
              Close
            </button>
            <button
              @click.stop="emit('accept')"
              class="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded w-full"
            >
              Accept
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["close", "accept"]);

const dialog = ref(null);

onClickOutside(dialog, () => emit("close"));
</script>

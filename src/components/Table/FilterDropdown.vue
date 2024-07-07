<template>
  <div class="relative" ref="dropdown">
    <button
      class="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-sky-300 rounded-full shadow"
      @click="show = !show"
    >
      Filters
    </button>
    <div
      class="absolute top-10 right-0 z-10 w-80 p-3 bg-white rounded-lg shadow border"
      v-if="show"
    >
      <div class="flex justify-between items-center mb-3">
        <h6 class="text-sm font-medium text-gray-900">Filters</h6>
        <slot name="actions"></slot>
      </div>
      <div class="flex flex-col space-y-2 text-sm">
        <slot name="filters"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
const dropdown = ref(null);
const show = ref(false);
onClickOutside(dropdown, () => (show.value = false));
</script>

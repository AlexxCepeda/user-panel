<template>
  <RouterLink
    :to="{ name: to }"
    class="rounded font-bold p-2 text-white hover:text-sky-400"
    active-class="bg-sky-400 hover:text-white"
  >
    <slot></slot>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
defineProps({
  to: {
    type: String,
    default: "home",
  },
});
</script>

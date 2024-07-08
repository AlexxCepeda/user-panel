<template>
  <div class="vertical-center flex flex-col justify-center items-center">
    <h1 class="text-center text-xl sm:text-3xl font-bold self-center">
      404 - Not found
    </h1>
    <RouterLink :to="{ name: 'home' }" class="underline">Go home</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

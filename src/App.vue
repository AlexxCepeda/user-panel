<script setup>
import { RouterView } from "vue-router";
import HeaderNav from "./components/Navbar/HeaderNav.vue";
</script>

<template>
  <HeaderNav />
  <div class="vertical-center container mx-auto px-10 py-5">
    <RouterView />
  </div>
</template>

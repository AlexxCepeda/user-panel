<template>
  <HeaderNav />
  <div class="vertical-center container mx-auto px-10 py-5">
    <RouterView />
  </div>
  <LoadingModal />
</template>

<script setup>
import { RouterView } from "vue-router";
import HeaderNav from "./components/Navbar/HeaderNav.vue";
import LoadingModal from "./components/LoadingModal.vue";
</script>

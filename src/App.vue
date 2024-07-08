<template>
  <HeaderNav />
  <main class="vertical-center container mx-auto px-10 py-5">
    <RouterView />
  </main>
  <Footer />
  <LoadingModal />
</template>

<script setup>
import { RouterView } from "vue-router";
import HeaderNav from "./components/Navbar/HeaderNav.vue";
import LoadingModal from "./components/LoadingModal.vue";
import Footer from "./components/Footer.vue";
</script>

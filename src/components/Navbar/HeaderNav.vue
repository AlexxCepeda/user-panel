<template>
  <header
    class="px-10 py-5 bg-gray-700 flex justify-between items-center w-full"
  >
    <Logo />
    <nav class="space-x-2">
      <Link to="home">Home</Link>
      <Link to="about">About</Link>
    </nav>
  </header>
</template>

<script setup>
import Link from "@/components/Navbar/Link.vue";
import Logo from "@/components/Navbar/Logo.vue";
</script>
